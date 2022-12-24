
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('users/', views.get_users),
    path('register/', views.register, name="register"),
    path('user/<int:id>/', views.get_user, name="user"),
    path('donors/<type>/', views.get_donors, name="donors"),
    path('user_profile/', views.user_profile, name="user_profile"),
    path('request/user/<int:id>/', views.submit_request, name="request_blood"),
    path('request/<int:id>/', views.get_request_by_id, name="blood_request_by_id"),
    path('requests/', views.get_request_by_user, name="blood_request_by_user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
