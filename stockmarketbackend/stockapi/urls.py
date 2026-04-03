from django.contrib import admin
from django.http import JsonResponse
from django.urls import path
from app_name.views import (
    StockView,
    FeaturedStockView,
    NewsView,
    RegisterView,
    LoginView,
    ProfileView,
    FeedbackListCreateView
)

def home(request):
    return JsonResponse({
        "message": "Stock API Backend Running 🚀",
        "status": "success"
    })

urlpatterns = [
    path("admin/", admin.site.urls),

    path("", home),

    # Auth
    path("api/register/", RegisterView.as_view()),
    path("api/login/", LoginView.as_view()),
    path("api/profile/", ProfileView.as_view()),

    # Stock
    path("api/stock/", StockView.as_view()),
    path("api/featured-stock/", FeaturedStockView.as_view()),

    # News
    path("api/news/", NewsView.as_view()),

    # Feedback
    path("api/feedback/", FeedbackListCreateView.as_view()),
]