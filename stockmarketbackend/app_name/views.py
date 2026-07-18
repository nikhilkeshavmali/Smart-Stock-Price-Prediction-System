from datetime import datetime, timedelta
import os
import requests



import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status


from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Feedback

import time
import google.generativeai as genai

# =====================================================
# INSIGHT FUNCTION
# =====================================================
def generate_insight(predictions):
    if len(predictions) < 2:
        return "Not enough data to generate insight."

    first_price = predictions[0]["price"]
    last_price = predictions[-1]["price"]
    change_percent = ((last_price - first_price) / first_price) * 100

    if change_percent > 5:
        return "Strong bullish momentum detected."
    elif change_percent > 0:
        return "Gradual upward movement expected."
    elif change_percent < -5:
        return "Strong bearish trend detected."
    else:
        return "Stock likely to remain stable."


# =====================================================
# SERIALIZERS
# =====================================================
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


# =====================================================
# STOCK VIEW
# =====================================================
# class StockView(APIView):
#     parser_classes = [JSONParser]
#
#     def post(self, request):
#         stock = request.data.get("stock")
#         duration = request.data.get("duration")
#
#         if not stock or not duration:
#             return Response({"error": "Provide stock and duration"}, status=status.HTTP_400_BAD_REQUEST)
#
#         try:
#             data = yf.download(stock, period=duration, interval="1d", progress=False)
#             # print (data)
#             if data.empty:
#                 return Response({"error": "No data found"}, status=400)
#
#             close_series = data["Close"].dropna()
#             if len(close_series) < 2:
#                 return Response({"error": "Not enough historical data"}, status=400)
#
#             prices = close_series.values.astype(float)
#             x = np.arange(len(prices))
#             A = np.vstack([x, np.ones(len(x))]).T
#             slope, intercept = np.linalg.lstsq(A, prices, rcond=None)[0]
#
#             predictions = []
#             for i in range(1, 7):
#                 future_price = slope * (len(prices) + i) + intercept
#                 predictions.append({
#                     "date": (datetime.now() + timedelta(days=30 * i)).strftime("%Y-%m"),
#                     "price": round(float(np.array(future_price).item()), 2)
#                 })
#
#             trend = "up" if slope > 0 else "down"
#             insight = generate_insight(predictions)
#
#             return Response({
#                 "symbol": stock.upper(),
#                 "trend": trend,
#                 "predictions": predictions,
#                 "insight": insight
#             })
#
#         except Exception as e:
#             import traceback
#             print(traceback.format_exc())
#             return Response({"error": str(e)}, status=500)




# Frontend sends "1w" / "1m" / "3m" / "6m" / "1y" / "5y" -- yfinance's `period`
# uses a different vocabulary, so map one to the other explicitly instead of
# passing the raw value through.
DURATION_TO_PERIOD = {
    "1w": "5d",
    "1m": "1mo",
    "3m": "3mo",
    "6m": "6mo",
    "1y": "1y",
    "5y": "5y",
}

# How many of the most recent historical candles to send to the frontend.
# yfinance can return years of daily bars for "5y" -- no chart needs all of
# them, and the response payload gets large fast.
MAX_HISTORICAL_CANDLES = 90

# How many months ahead to forecast.
FORECAST_MONTHS = 6


class StockView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        stock = request.data.get("stock")
        duration = request.data.get("duration")

        if not stock or not duration:
            return Response(
                {"error": "Provide stock and duration"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        period = DURATION_TO_PERIOD.get(duration)
        if period is None:
            return Response(
                {"error": f"Unsupported duration '{duration}'. Use one of: "
                          f"{', '.join(DURATION_TO_PERIOD)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            data = yf.download(stock, period=period, interval="1d", progress=False)

            if data is None or data.empty:
                return Response(
                    {"error": f"No data found for '{stock}'"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Newer yfinance versions return MultiIndex columns
            # (e.g. ("Close", "AAPL")) even for a single ticker. Flatten them
            # so data["Close"] etc. work the same way regardless of version.
            if isinstance(data.columns, pd.MultiIndex):
                data.columns = data.columns.get_level_values(0)

            data = data.dropna(subset=["Open", "High", "Low", "Close", "Volume"])
            if len(data) < 2:
                return Response(
                    {"error": "Not enough historical data"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # ---- historical OHLC candles for the chart ----------------------
            recent = data.tail(MAX_HISTORICAL_CANDLES)
            historical = [
                {
                    "date": index.strftime("%Y-%m-%d"),
                    "open": round(float(row["Open"]), 2),
                    "high": round(float(row["High"]), 2),
                    "low": round(float(row["Low"]), 2),
                    "close": round(float(row["Close"]), 2),
                    "volume": int(row["Volume"]),
                }
                for index, row in recent.iterrows()
            ]

            # ---- linear-regression forecast on closing price ---------------
            close_series = data["Close"]
            prices = close_series.values.astype(float)
            x = np.arange(len(prices))
            A = np.vstack([x, np.ones(len(x))]).T
            slope, intercept = np.linalg.lstsq(A, prices, rcond=None)[0]

            # residual spread of the fit, used to build a confidence band
            # around each forecast point (wider the further out we predict)
            fitted = slope * x + intercept
            residual_std = float(np.std(prices - fitted)) if len(prices) > 2 else 0.0

            prediction = []
            legacy_predictions = []  # kept for any old frontend code still reading `predictions`
            last_date = data.index[-1]
            for i in range(1, FORECAST_MONTHS + 1):
                future_index = len(prices) + i * 21  # ~21 trading days per month
                predicted_close = float(slope * future_index + intercept)
                band = residual_std * (1 + i * 0.15)  # widen band further into the future
                future_date = (last_date + timedelta(days=30 * i)).strftime("%Y-%m-%d")

                prediction.append({
                    "date": future_date,
                    "predictedClose": round(predicted_close, 2),
                    "low": round(predicted_close - band, 2),
                    "high": round(predicted_close + band, 2),
                })
                legacy_predictions.append({
                    "date": (datetime.now() + timedelta(days=30 * i)).strftime("%Y-%m"),
                    "price": round(predicted_close, 2),
                })

            trend = "up" if slope > 0 else "down"
            insight = generate_insight(legacy_predictions)

            return Response({
                "symbol": stock.upper(),
                "trend": trend,
                "historical": historical,
                "prediction": prediction,
                "predictions": legacy_predictions,
                "insight": insight,
            })

        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# =====================================================
# FEATURED STOCK VIEW
# =====================================================
class FeaturedStockView(APIView):

    def get(self, request):   # ✅ change post → get
        stocks = [
            "TCS.NS", "INFY.NS", "RELIANCE.NS",
            "HDFCBANK.NS", "ICICIBANK.NS",
            "SBIN.NS", "LT.NS", "ITC.NS", "HINDUNILVR.NS"
        ]

        result = []

        for s in stocks:
            try:
                data = yf.download(s, period="5d", interval="1d", progress=False)
                close_series = data["Close"].dropna()

                if len(close_series) < 2:
                    continue

                current_price = float(close_series.iloc[-1])
                previous_price = float(close_series.iloc[-2])
                change = ((current_price - previous_price) / previous_price) * 100

                result.append({
                    "stock": s,
                    "company_name": s.replace(".NS", ""),
                    "current_price_inr": round(current_price, 2),
                    "trend": "Up" if change > 0 else "Down" if change < 0 else "Neutral",
                    "percentage_change": round(change, 2)
                })

            except Exception as e:
                print(f"Error fetching {s}: {e}")
                continue

        return Response(result)

# =====================================================
# NEWS VIEW
# =====================================================
class NewsView(APIView):

    def get(self, request):
        api_key = os.getenv("NEWS_API_KEY")
        if not api_key:
            return Response([])

        try:
            r = requests.get(
                "https://newsapi.org/v2/everything",
                params={
                    "q": "stock market India",
                    "pageSize": 5,
                    "apiKey": api_key
                }
            )

            data = r.json()

            articles = [
                {
                    "title": a.get("title"),
                    "source": a.get("source", {}).get("name")
                }
                for a in data.get("articles", [])
            ]

            return Response(articles)

        except Exception as e:
            print(f"News API error: {e}")
            return Response([])

# =====================================================
# AUTH VIEWS
# =====================================================
class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=201)
        return Response(serializer.errors, status=400)


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"]
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh)
                })
            return Response({"error": "Invalid credentials"}, status=401)
        return Response(serializer.errors, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)


# =====================================================
# FEEDBACK VIEW
# =====================================================
class FeedbackListCreateView(APIView):

    def get(self, request):
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# =====================================================
# CHAT VIEW
# =====================================================
# MAX_RETRIES = 2
#
# class ChatView(APIView):
#     parser_classes = [JSONParser]
#
#     def post(self, request):
#         message = request.data.get("message")
#         if not message:
#             return Response(
#                 {"error": "Provide a message"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#
#         model = genai.GenerativeModel("gemini-2.0-flash")
#
#         for attempt in range(MAX_RETRIES + 1):
#             try:
#                 result = model.generate_content(message)
#                 return Response({"reply": result.text})
#             except Exception as e:
#                 error_text = str(e)
#                 is_rate_limit = "429" in error_text or "quota" in error_text.lower()
#
#                 if is_rate_limit and attempt < MAX_RETRIES:
#                     time.sleep(3 * (attempt + 1))
#                     continue
#
#                 if is_rate_limit:
#                     return Response(
#                         {"error": "The assistant is temporarily rate-limited. Please try again shortly."},
#                         status=status.HTTP_429_TOO_MANY_REQUESTS,
#                     )
#
#                 import traceback
#                 print(traceback.format_exc())
#                 return Response(
#                     {"error": "Failed to get a response from the assistant."},
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 )