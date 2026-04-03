🚀 Smart Stock Prediction System
AI-Powered Market Forecasting & Investment Insight Platform

A full-stack financial analytics platform that predicts stock price trends, analyzes momentum, and generates AI-driven investment insights for the Indian stock market.

Built with React + TypeScript + Django REST Framework + NumPy

📌 Overview

The Smart Stock Prediction System is a production-structured full-stack web application designed to help investors understand stock trends using mathematical forecasting models.

It integrates:

📊 Real-time NSE stock data
🤖 AI-based price trend prediction
📈 Market momentum analysis
📰 Financial news integration
🔐 JWT-secured authentication system

This project demonstrates practical implementation of data analysis, backend APIs, authentication, and frontend state management in a real-world financial use case.

🧠 Problem Statement

Retail investors often face:

Difficulty interpreting stock trends
Lack of structured forecasting tools
Complex and expensive financial platforms
Limited data-driven insights

This system simplifies stock analysis by providing:

✔ 6-month future price prediction
✔ Trend direction detection
✔ AI-generated explanatory insights
✔ Featured NSE stocks dashboard
✔ Clean and intuitive UI

🏗️ System Architecture
Frontend (React + TypeScript)
        ↓
Django REST API
        ↓
Prediction Engine (NumPy Linear Regression)
        ↓
yFinance Data Source
        ↓
NewsAPI Integration

The architecture follows a clear separation of concerns:

Frontend → UI & State Management
Backend → API & Business Logic
Prediction Engine → Mathematical Forecasting
External APIs → Market Data
⚙️ Tech Stack
🖥️ Frontend
React
TypeScript
Tailwind CSS
React Router
TanStack Query
Axios
JWT Authentication Handling
🔙 Backend
Django
Django REST Framework
SimpleJWT
NumPy
Pandas
yFinance
NewsAPI
📊 Core Algorithm
🔹 Linear Regression (Least Squares Method)
Why Linear Regression?
Lightweight and fast
Easily interpretable
Ideal for trend analysis
Suitable for portfolio demonstration
No heavy ML frameworks required
Prediction Workflow
Fetch historical stock data using yFinance
Extract daily closing prices
Apply Least Squares Linear Regression
Calculate slope (trend direction)
Forecast next 6 months
Generate AI insight based on predicted growth
📈 Trend Detection Logic
Condition	Result
Slope > 0	Bullish Trend 📈
Slope < 0	Bearish Trend 📉
🤖 Insight Generation Engine
Predicted Change %	Insight
> 5%	Strong Bullish Momentum
0–5%	Gradual Upward Movement
-5–0%	Slight Decline
< -5%	Strong Bearish Risk

This makes the system explanatory, not just predictive.

🔐 Authentication & Security
JWT-based authentication
Access & Refresh tokens
Protected profile route
Secure backend endpoints
Token-based frontend request handling

Authentication ensures secure user sessions and API access control.

✨ Key Features
👤 User Management
User Registration
Secure Login
Profile API
Token-based Authentication
📈 Stock Prediction
Custom stock search (NSE symbols)
Duration-based historical data selection
6-month forecast
AI-based trend classification
Insight summary
⭐ Featured Stocks

Top Indian NSE stocks including:

TCS
INFY
RELIANCE
HDFCBANK
ICICIBANK
SBIN
LT
ITC
HINDUNILVR
📰 Market News
Integrated NewsAPI
Real-time Indian stock market headlines
💬 Feedback System
User feedback submission
Backend-stored feedback records
📂 Project Structure
Smart-Stock-Prediction/
│
├── frontend/              # React + TypeScript App
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── main.tsx
│
├── backend/               # Django REST API
│   ├── app_name/
│   │   ├── views.py
│   │   ├── models.py
│   │   └── serializers.py
│   └── settings.py
│
└── README.md
🚀 Installation & Setup
🔙 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Server runs at:

http://127.0.0.1:8000/
🖥️ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173/
📊 Sample API Response
{
  "symbol": "TCS.NS",
  "trend": "up",
  "predictions": [
    { "date": "2026-05", "price": 4120.45 },
    { "date": "2026-06", "price": 4180.20 }
  ],
  "insight": "Strong bullish momentum detected."
}
🎯 Why This Project Stands Out

This is not a simple CRUD application.

It demonstrates:

Mathematical forecasting logic
Real financial API integration
Full-stack architecture
Secure authentication system
Structured backend design
Industry-style API responses
Clean UI/UX implementation

This project is ideal for:

Portfolio showcase
Full-stack interviews
Data-driven web applications
AI-integrated web systems
🚀 Future Enhancements
LSTM Deep Learning model
WebSocket real-time updates
Advanced interactive charts
Portfolio tracker
PostgreSQL production database
Docker containerization
Cloud deployment (AWS / Render / Railway)
👨‍💻 Developer

Nikhil Mali
Full Stack Developer
React • Django • Machine Learning Enthusiast

📌 Disclaimer

This project is built for educational and research purposes only.
Stock market investments involve financial risk.

⭐ Support

If you found this project useful:

⭐ Star the repository
🍴 Fork it
📢 Share it
