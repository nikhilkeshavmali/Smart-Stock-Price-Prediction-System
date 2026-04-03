# 📈 Smart Stock Prediction System – Frontend

This is the frontend of the **Smart Stock Prediction System**, an AI-powered stock forecasting platform that provides trend predictions, featured stocks insights, and market news updates.

Built using modern React architecture with a clean, responsive UI.

---

## 🚀 Tech Stack

- ⚛️ React (Vite + TypeScript)
- 🎨 Tailwind CSS
- 🧩 ShadCN UI
- 🔐 JWT Authentication
- 📡 REST API Integration (Django Backend)
- 📊 Dynamic Data Rendering
- 🔔 Toast Notifications

---

## ✨ Features

- 🔐 User Authentication (Login / Signup)
- 👤 User Profile Dashboard
- 📈 Stock Price Prediction with Trend Insight
- ⭐ Featured Indian Stocks
- 📰 Market News Section
- 💡 AI Generated Market Insights
- 📱 Fully Responsive Design
- 🎨 Modern Gradient UI with Glassmorphism

---

## 🏗️ Project Structure

frontend/
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ ├── lib/
│ └── App.tsx
│
├── public/
├── package.json
└── vite.config.ts

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nikhilkeshavmali/Smart-Stock-Price-Prediction-System
2️⃣ Navigate to Frontend Folder
cd frontend
3️⃣ Install Dependencies
npm install
4️⃣ Run Development Server
npm run dev

App will run at:

http://localhost:5173
🔗 Backend Connection

Make sure your Django backend is running at:

http://127.0.0.1:8000

Frontend API calls are configured to connect with:

/api/register/
/api/login/
/api/profile/
/api/stock/
/api/featured-stock/
/api/news/
🔐 Authentication Flow
User logs in
JWT access_token is stored in localStorage
Protected routes require token
Profile data fetched using Authorization header
🎯 Future Improvements
📊 Interactive stock charts
📈 Real-time WebSocket updates
🌙 Dark/Light theme toggle
📱 Mobile optimization enhancements
📤 Deployment on Vercel
👨‍💻 Developer

Nikhil Mali
Full Stack Developer (React + Django)

📜 License

This project is developed for educational and portfolio purposes.
```
