📈 Smart Stock Prediction System – Backend

The backend of the Smart Stock Prediction System is a scalable and secure REST API built using Django and Django REST Framework.

It powers AI-based stock forecasting, user authentication, news integration, and feedback management.

This backend is designed with clean architecture, modular API design, and production-ready practices.

🚀 Overview

The backend handles:

🔐 Secure authentication using JWT
📊 AI-driven stock trend prediction
⭐ Featured Indian stock insights
📰 Live financial news integration
💬 User feedback management
📡 RESTful API architecture
🏗️ Tech Stack
Core Technologies
🐍 Python 3.x
🌐 Django
🔗 Django REST Framework
Authentication
🔐 JWT (SimpleJWT)
Data & Prediction
📊 NumPy
📈 Pandas
📉 Linear Regression Algorithm
📡 yFinance API
News Integration

📰 NewsAPI
Database
🗄 SQLite (Development)
🗄 PostgreSQL (Production Ready)

✨ Key Features
JWT-based User Registration & Login
Authenticated User Profile API
AI-based Stock Price Forecasting (6-month trend)
Featured NSE Stock Insights
Live Market News API
Feedback Submission System
Clean, Modular API Structure
Production-ready backend design

📂 Project Structure
backend/
│
├── app_name/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
│
├── project_name/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── manage.py
├── db.sqlite3
└── requirements.txt

⚙️ Installation & Setup

1️⃣ Clone Repository
git clone https://github.com/nikhilkeshavmali/Smart-Stock-Price-Prediction-System.git
cd Stock-Prediction-AI/backend
2️⃣ Create Virtual Environment
python -m venv venv

Activate environment:

Windows

venv\Scripts\activate

Mac/Linux

source venv/bin/activate
3️⃣ Install Dependencies
pip install -r requirements.txt

If requirements.txt is not created:

pip install django djangorestframework djangorestframework-simplejwt yfinance numpy pandas requests
pip freeze > requirements.txt
4️⃣ Run Migrations
python manage.py migrate
5️⃣ Start Development Server
python manage.py runserver

Backend runs at:

http://127.0.0.1:8000/
🔐 Authentication System (JWT)

Authentication uses JSON Web Tokens.

Flow:
User registers via /api/register/
User logs in via /api/login/
Backend returns:
access_token
refresh_token
Frontend sends token in header:
Authorization: Bearer <access_token>

Protected endpoints require a valid JWT.

📡 API Endpoints

🔐 Authentication APIs
Method	Endpoint	Description
POST	/api/register/	Register new user
POST	/api/login/	Login user
GET	/api/profile/	Get authenticated user profile

📈 Stock Prediction APIs
Method	Endpoint	Description
POST	/api/stock/	Predict stock trend
POST	/api/featured-stock/	Get top NSE stocks

📰 News API
Method	Endpoint	Description
POST	/api/news/	Get latest financial news

💬 Feedback APIs
Method	Endpoint	Description
GET	/api/feedback/	Get all feedback
POST	/api/feedback/	Submit feedback

📊 Prediction Logic

The stock prediction engine follows these steps:

Fetch historical stock data using yFinance
Clean and preprocess data using Pandas
Apply Linear Regression using NumPy
Forecast next 6 months price trend
Generate AI-based market insight:
📈 Bullish Trend
📉 Bearish Trend
➖ Stable Market
🌍 Environment Variables

Create a .env file in backend root:

NEWS_API_KEY=your_news_api_key

Make sure .env is added to .gitignore.



🛡️ Security Practices
JWT Authentication
Django Password Hashing
Protected Profile Endpoints
Token-based Authorization
Secure Environment Variables


🚀 Future Improvements
🤖 LSTM Deep Learning Model
📊 Real-time WebSocket stock updates
🌐 Deployment on AWS / Render / Railway
🗄 PostgreSQL production database
📈 Advanced AI-based technical indicators


👨‍💻 Developer
Nikhil Mali
Full Stack Developer (React + Django)
AI & Data-Driven Web Applications

📜 License

This project is developed for educational, academic, and portfolio purposes.
