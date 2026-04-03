# 🚀 Smart Stock Prediction System
### AI-Powered Market Forecasting & Analytics Platform

An intelligent full-stack web application that predicts stock price trends, analyzes market momentum, and provides AI-generated investment insights for Indian stock market investors.

Built with **React + Django REST + Machine Learning Logic**

---

## 📌 Problem Statement

Retail investors often struggle with:

- Understanding stock trends 📉
- Predicting future price movement 📈
- Interpreting raw financial data
- Making data-driven investment decisions

This project simplifies stock analysis by providing:

✔ Trend prediction  
✔ AI-generated insights  
✔ Featured NSE stocks  
✔ Market news integration  
✔ Clean dashboard UI  

---

## 🧠 Why This Project?

Stock prediction platforms are usually:

- Expensive 💰
- Complex 📊
- Not beginner-friendly

This system provides:

> ⚡ Lightweight AI-based forecasting  
> ⚡ Clean dashboard  
> ⚡ JWT-secured authentication  
> ⚡ Real-time data integration  

Perfect for educational, portfolio, and research purposes.

---

# 🏗️ System Architecture

Frontend (React + TypeScript)
        ⬇
REST API (Django + DRF)
        ⬇
Prediction Engine (NumPy + Linear Regression)
        ⬇
yFinance Data Source

---

# ⚙️ Tech Stack

## 🖥️ Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- JWT Authentication
- TanStack Query

## 🔙 Backend
- Django
- Django REST Framework
- SimpleJWT
- NumPy
- Pandas
- yFinance
- NewsAPI

---

# 📊 Core Algorithm Used

## 🔹 Linear Regression (NumPy Based)

### Why Linear Regression?

✔ Simple and interpretable  
✔ Fast computation  
✔ Lightweight (No heavy ML libraries required)  
✔ Suitable for trend forecasting  
✔ Good for portfolio demonstration  

### How It Works:

1. Fetch historical stock data using yFinance
2. Extract closing prices
3. Apply Least Squares Linear Regression
4. Compute slope (trend direction)
5. Forecast next 6 months prices
6. Generate AI Insight based on percentage change

---

### 📈 Trend Logic

- Slope > 0 → Bullish Trend 📈
- Slope < 0 → Bearish Trend 📉

---

### 🤖 Insight Engine

Based on predicted percentage growth:

| Change % | Insight |
|----------|----------|
| > 5% | Strong Bullish Momentum |
| 0–5% | Gradual Growth |
| -5–0% | Slight Decline |
| < -5% | Strong Bearish Risk |

This makes the system not just predictive — but **explanatory**.

---

# 🔐 Authentication System

- JWT-based secure login
- Access & Refresh tokens
- Protected profile route
- Secure API communication

---

# ✨ Key Features

## 🔐 User System
- Register
- Login
- Profile
- Logout

## 📈 Stock Prediction
- Custom stock search
- Duration selection
- 6-Month future forecast
- AI-based trend analysis
- Insight summary

## ⭐ Featured Stocks
Top Indian NSE stocks like:
- TCS
- INFY
- RELIANCE
- HDFCBANK
- ICICIBANK
- SBIN
- LT
- ITC
- HINDUNILVR

## 📰 Market News
- Integrated NewsAPI
- Real-time Indian market headlines

## 💬 Feedback System
- Users can submit feedback
- Backend-stored entries

---

# 📂 Project Structure

Smart-Stock-Prediction/
│
├── frontend/ (React App)
├── backend/  (Django REST API)
└── README.md

---

# 🚀 How To Run

## Backend

cd backend
python manage.py runserver


## Frontend

cd frontend
npm install
npm run dev


---

# 📊 Sample API Response (Stock Prediction)

```json
{
  "symbol": "TCS.NS",
  "trend": "up",
  "predictions": [
    { "date": "2026-05", "price": 4120.45 }
  ],
  "insight": "The model predicts strong bullish momentum with significant price growth potential."
}
🎯 What Makes This Project Strong?

✔ Full-stack architecture
✔ Machine Learning logic integration
✔ Real financial data
✔ Clean UI/UX
✔ Authentication system
✔ Scalable backend
✔ Recruiter-friendly complexity

This is not just a CRUD project —
It integrates:

Data science concepts
API handling
Secure authentication
Real-world stock data
Mathematical forecasting
🚀 Future Improvements
LSTM Deep Learning Model
Real-time WebSocket updates
PostgreSQL production database
Portfolio tracking system
Chart visualization with advanced analytics
Deployment on AWS / Render
👨‍💻 Developer

Nikhil Mali
Full Stack Developer
React • Django • AI Enthusiast

📌 Disclaimer

This system is built for educational and research purposes.
Stock market investments carry financial risk.

⭐ If You Like This Project

Give it a star on GitHub ⭐


---
