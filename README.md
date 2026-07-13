<div align="center">

# 📈 Smart Stock Prediction System

**AI-Powered Market Forecasting & Investment Insight Platform for the Indian Stock Market (NSE)**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/Django%20REST-ff1709?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)


· [Report Bug](#) · [Request Feature](#)

</div>

---

## 🏆 Recognition

> Acknowledged by **Nirmal Bang Securities** for its practical, data-driven approach to stock trend forecasting.

## 📌 Overview

**Smart Stock Prediction System** is a production-structured, full-stack financial analytics platform that helps retail investors understand stock trends using mathematical forecasting models. It combines real-time NSE market data, a custom regression-based prediction engine, and AI-generated insight summaries behind a secure, JWT-authenticated REST API.

Retail investors typically struggle with:

- Interpreting raw stock trends without technical expertise
- Accessing structured, affordable forecasting tools
- Making sense of complex or expensive financial platforms

This project addresses that gap with 6-month trend forecasting, automated insight generation, and a clean, intuitive dashboard.

## ✨ Key Features

| Category | Capabilities |
|---|---|
| 🔐 **Authentication** | JWT-based login/register, access & refresh tokens, protected profile route |
| 📈 **Prediction Engine** | Custom NSE stock search, historical data selection, 6-month price forecast, bullish/bearish trend classification |
| 🤖 **AI Insights** | Auto-generated, human-readable summaries explaining predicted momentum |
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

## 👨‍💻 Developer

**Nikhil Mali**
Full Stack Developer — React · Django · Machine Learning Enthusiast


## 📌 Disclaimer

This project is built for educational and research purposes only. Stock market investments involve financial risk, and predictions here should not be treated as financial advice.

## ⭐ Support

If you found this project useful, consider giving it a star, forking it, or sharing it with others.
