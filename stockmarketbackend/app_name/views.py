# app_name/views.py

from datetime import datetime, timedelta
import os
import requests
import yfinance as yf
import numpy as np

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Feedback


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
        fields = ["id", "username", "email"]   # ✅ EMAIL ADDED


# =====================================================
# STOCK VIEW
# =====================================================

class StockView(APIView):
    parser_classes = [JSONParser]

    def post(self, request):
        stock = request.data.get("stock")
        duration = request.data.get("duration")

        if not stock or not duration:
            return Response(
                {"error": "Provide stock and duration"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            data = yf.download(stock, period=duration, interval="1d", progress=False)

            if data.empty:
                return Response({"error": "No data found"}, status=400)

            prices = data["Close"].dropna().values.astype(float)

            x = np.arange(len(prices))
            A = np.vstack([x, np.ones(len(x))]).T
            slope, intercept = np.linalg.lstsq(A, prices, rcond=None)[0]

            predictions = []
            for i in range(1, 7):
                future_price = slope * (len(prices) + i) + intercept
                predictions.append({
                    "date": (datetime.now() + timedelta(days=30 * i)).strftime("%Y-%m"),
                    "price": round(float(future_price), 2)
                })

            trend = "up" if slope > 0 else "down"
            insight = generate_insight(predictions)

            return Response({
                "symbol": stock.upper(),
                "trend": trend,
                "predictions": predictions,
                "insight": insight
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)


# =====================================================
# FEATURED STOCK VIEW
# =====================================================

class FeaturedStockView(APIView):

    def post(self, request):
        stocks = [
            "TCS.NS", "INFY.NS", "RELIANCE.NS",
            "HDFCBANK.NS", "ICICIBANK.NS",
            "SBIN.NS", "LT.NS", "ITC.NS", "HINDUNILVR.NS"
        ]

        result = []

        for s in stocks:
            try:
                data = yf.download(s, period="5d", interval="1d", progress=False)
                close = data["Close"].dropna()

                if len(close) < 2:
                    continue

                current_price = float(close.iloc[-1])
                previous_price = float(close.iloc[-2])
                change = ((current_price - previous_price) / previous_price) * 100

                result.append({
                    "stock": s,
                    "company_name": s.replace(".NS", ""),
                    "current_price_inr": round(current_price, 2),
                    "trend": "Up" if change > 0 else "Down" if change < 0 else "Neutral",
                    "percentage_change": round(change, 2)
                })

            except Exception:
                continue

        return Response(result)


# =====================================================
# NEWS VIEW
# =====================================================

class NewsView(APIView):

    def post(self, request):
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

        except Exception:
            return Response([])


# =====================================================
# AUTH VIEWS
# =====================================================

class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=201
            )

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