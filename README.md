<div align="center">

# 📈 Smart Stock Prediction System

> **Data-Driven Stock Market Forecasting Platform for the Indian Stock Market (NSE)**

Predict market trends using mathematical forecasting, real-time financial data, and auto-generated investment insights.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/Django%20REST-ff1709?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)


· [Report Bug](#) · [Request Feature](#)

</div>

---

## 📚 Table of Contents

- [Recognition](#-recognition)
- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#️-system-architecture)
- [Tech Stack](#️-tech-stack)
- [Prediction Methodology](#-prediction-methodology)
- [Design Decisions](#-design-decisions)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Sample API Response](#-sample-api-response)
- [Security](#-security)
- [Performance](#-performance)
- [Screenshots](#-screenshots)
- [Why This Project Stands Out](#-why-this-project-stands-out)
- [Roadmap](#️-roadmap)
- [Developer](#-developer)
- [License](#-license)
- [Disclaimer](#-disclaimer)
- [Support](#-support)

---

## 🏆 Recognition

> This project was acknowledged by **Nirmal Bang Securities** for demonstrating a practical approach to stock trend forecasting using real-time market data and mathematical prediction techniques.

## 📌 Overview

**Smart Stock Prediction System** is a production-structured, full-stack financial analytics platform that helps retail investors understand stock trends using mathematical forecasting models. It combines real-time NSE market data, a custom regression-based prediction engine, and auto-generated insight summaries behind a secure, JWT-authenticated REST API.

Retail investors typically struggle with:

- Interpreting raw stock trends without technical expertise
- Accessing structured, affordable forecasting tools
- Making sense of complex or expensive financial platforms

This project addresses that gap with 6-month trend forecasting, automated insight generation, and a clean, intuitive dashboard.

## ✨ Key Features

| Category | Capabilities |
|---|---|
| 🔐 **Authentication** | JWT-based login/register, access & refresh tokens, protected profile route |
| 📈 **Prediction Engine** | Custom NSE stock search, historical data selection, 1 week to 5 year's price forecast, bullish/bearish trend classification |
| 🤖 **Auto-Generated Insights** | Human-readable summaries explaining predicted momentum |
| ⭐ **Featured Stocks** | Curated dashboard of top NSE tickers (TCS, INFY, RELIANCE, HDFCBANK, ICICIBANK, SBIN, LT, ITC, HINDUNILVR) |
| 📰 **Market News** | Live Indian stock market headlines via NewsAPI |
| 💬 **Feedback System** | In-app user feedback, persisted to the backend |

## 🏗️ System Architecture

```
Frontend (React + TypeScript)
        │
        ▼
Django REST API  ──▶  JWT Auth (SimpleJWT)
        │
        ▼
Prediction Engine (NumPy · Least Squares Linear Regression)
        │
        ▼
Data Layer  ──▶  yFinance (market data)  ·  NewsAPI (headlines)
```

- **Frontend** — UI rendering & client-side state management
- **Backend** — REST API, authentication, and business logic
- **Prediction Engine** — mathematical forecasting layer
- **External APIs** — live market data and financial news

## ⚙️ Tech Stack

**Frontend:** React · TypeScript · Tailwind CSS · React Router · TanStack Query · Axios

**Backend:** Django · Django REST Framework · SimpleJWT · NumPy · Pandas · yFinance · NewsAPI

## 📊 Prediction Methodology

The core forecasting engine uses **Least Squares Linear Regression** — chosen for being lightweight, fast, and interpretable without the overhead of a heavy ML framework.

**Workflow:**
1. Fetch historical stock data via yFinance
2. Extract daily closing prices
3. Fit a least-squares linear regression
4. Derive the slope to determine trend direction
5. Forecast prices 6 months forward
6. Generate a natural-language insight from the predicted growth rate

**Trend classification:**

| Slope | Result |
|---|---|
| `> 0` | Bullish 📈 |
| `< 0` | Bearish 📉 |

**Insight generation:**

| Predicted Change | Insight |
|---|---|
| `> +5%` | Strong Bullish Momentum |
| `0% to +5%` | Gradual Upward Movement |
| `-5% to 0%` | Slight Decline |
| `< -5%` | Strong Bearish Risk |

This makes the output **explanatory, not just predictive.**

## 💡 Design Decisions

Least Squares Linear Regression was selected because it is:

- Fast for real-time prediction
- Easy to interpret
- Lightweight
- Requires minimal computational resources
- Suitable for demonstrating forecasting concepts transparently, without the "black box" nature of heavier ML models

## 📂 Project Structure

```
Smart-Stock-Prediction/
│
├── frontend/                # React + TypeScript app
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── main.tsx
│
├── backend/                 # Django REST API
│   ├── app_name/
│   │   ├── views.py
│   │   ├── models.py
│   │   └── serializers.py
│   └── settings.py
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Runs at `http://127.0.0.1:8000/`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173/`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a new user |
| POST | `/api/login/` | Login and receive JWT tokens |
| GET | `/api/profile/` | Authenticated user profile |
| POST | `/api/stock/` | Generate a stock prediction |
| GET | `/api/news/` | Latest market news headlines |
| POST | `/api/feedback/` | Submit user feedback |

## 📊 Sample API Response

```json
{
  "symbol": "TCS.NS",
  "trend": "up",
  "predictions": [
    { "date": "2026-05", "price": 4120.45 },
    { "date": "2026-06", "price": 4180.20 }
  ],
  "insight": "Strong bullish momentum detected."
}
```

## 🔒 Security

- JWT authentication with access & refresh tokens
- Protected routes on both frontend and backend
- Secure password hashing
- Environment variables used for API keys and secrets

## ⚡ Performance

- Optimized API response payloads
- Cached frontend requests via TanStack Query
- Lazy-loaded React pages
- Responsive UI across devices
- Modular backend architecture for maintainability

## 📸 Screenshots

### Home
<img width="1901" height="927" alt="Home" src="https://github.com/user-attachments/assets/1c72d668-3c47-4aa5-81ac-f740eff99f0e" />

### Prediction Dashboard
<img width="1901" height="927" alt="Prediction Dashboard" src="https://github.com/user-attachments/assets/500971d2-005d-434a-a471-895d3cac3905" />

### Stock Analysis
<img width="1906" height="926" alt="Stock Analysis" src="https://github.com/user-attachments/assets/76eabc79-1c67-46e1-9237-f1f2722e19bc" />

### Login
<img width="1917" height="920" alt="Login" src="https://github.com/user-attachments/assets/ddc05c32-6818-45f4-9731-1070bee592f9" />

## 🎯 Why This Project Stands Out

This goes beyond a typical CRUD app — it demonstrates:

- Mathematical forecasting logic implemented from scratch
- Integration with real financial data and news APIs
- Full-stack architecture with a clear separation of concerns
- Secure, token-based authentication
- Structured, industry-style API design
- Clean, production-quality UI/UX

## 🛣️ Roadmap

- [ ] LSTM-based deep learning model
- [ ] WebSocket real-time price updates
- [ ] Advanced interactive charting
- [ ] Portfolio tracker
- [ ] PostgreSQL production database
- [ ] Docker containerization
- [ ] Cloud deployment (AWS / Render / Railway)
- [ ] Sentiment analysis on market news
- [ ] AI chat assistant for investment insights

## 👨‍💻 Developer

**Nikhil Mali**
Full Stack Developer — React · Django · TypeScript · Python · Machine Learning Enthusiast

📧 Email · 💼 LinkedIn · 🌐 [Portfolio](https://nikhilkeshavmali.vercel.app) · 🐙 [GitHub](https://github.com/nikhilkeshavmali)

## 📄 License

© 2026 Nikhil Mali. All Rights Reserved.

This repository is provided for educational and portfolio purposes only. You may view the source code, but you may not copy, redistribute, modify, or use it in commercial or production environments without prior written permission.

## 📌 Disclaimer

This project is built for educational and research purposes only. Predictions generated by this application are based on historical market trends and mathematical models. They should not be interpreted as investment recommendations or financial advice.

## ⭐ Support

If you found this project interesting, consider giving it a star.
