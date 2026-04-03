# 📈 Smart Stock Prediction System – Backend

This is the backend of the **Smart Stock Prediction System**, an AI-powered stock forecasting platform built with Django and Django REST Framework.

It provides REST APIs for stock predictions, featured stocks, news updates, user authentication, and feedback management.

---

## 🚀 Tech Stack

- 🐍 Python 3
- 🌐 Django
- 🔗 Django REST Framework
- 🔐 JWT Authentication (SimpleJWT)
- 📊 NumPy & Pandas
- 📈 yFinance API
- 📰 NewsAPI Integration
- 🗄️ SQLite (Default) / PostgreSQL (Production Ready)

---

## ✨ Features

- 🔐 User Registration & Login (JWT Based)
- 👤 Authenticated User Profile API
- 📈 AI-based Stock Trend Prediction
- ⭐ Featured Indian Stocks (Top 9 NSE Stocks)
- 📰 Live Stock Market News
- 💬 Feedback Submission API
- 📊 Linear Regression-based Forecasting
- 📦 Clean API Architecture

---

## 🏗️ Project Structure

backend/
│
├── app_name/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ └── urls.py
│
├── project_name/
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
│
├── db.sqlite3
├── manage.py
└── requirements.txt

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Stock-Prediction-AI.git
2️⃣ Navigate to Backend
cd backend
3️⃣ Create Virtual Environment
python -m venv venv

Activate:

Windows

venv\Scripts\activate

Mac/Linux

source venv/bin/activate
4️⃣ Install Dependencies
pip install -r requirements.txt

If requirements.txt not created yet:

pip install django djangorestframework djangorestframework-simplejwt yfinance numpy pandas requests

Then generate:

pip freeze > requirements.txt
5️⃣ Run Migrations
python manage.py migrate
6️⃣ Start Development Server
python manage.py runserver

Server will run at:

http://127.0.0.1:8000
🔐 Authentication System

Authentication is handled using JWT (JSON Web Tokens).

Flow:
User registers
User logs in
Backend returns:
access_token
refresh_token
Frontend sends token in header:
Authorization: Bearer <access_token>
📡 API Endpoints
🔐 Auth APIs
Method	Endpoint	Description
POST	/api/register/	Register new user
POST	/api/login/	Login user
GET	/api/profile/	Get logged-in user profile
📈 Stock APIs
Method	Endpoint	Description
POST	/api/stock/	Get stock prediction
POST	/api/featured-stock/	Get top 9 NSE stocks
📰 News API
Method	Endpoint	Description
POST	/api/news/	Get latest stock market news
💬 Feedback API
Method	Endpoint	Description
GET	/api/feedback/	Get all feedback
POST	/api/feedback/	Submit feedback
📊 Prediction Logic

The stock prediction system:

Fetches historical stock data using yFinance
Applies Linear Regression using NumPy
Forecasts next 6 months prices
Generates AI-based insight:
Bullish Trend
Bearish Trend
Stable Market
🌍 Environment Variables

Create .env file:

NEWS_API_KEY=your_news_api_key
🛡️ Security
JWT Authentication
Password Hashing (Django built-in)
Authenticated profile endpoint
Protected APIs
🚀 Future Improvements
🤖 Machine Learning (LSTM Model)
📊 Real-time stock data via WebSockets
🌐 Deployment on Render / Railway
🗄️ PostgreSQL production database
📈 Advanced Chart Analytics
👨‍💻 Developer

Nikhil Mali
Full Stack Developer (React + Django)

📜 License

Developed for educational and portfolio purposes.


---
```
