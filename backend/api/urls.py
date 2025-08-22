from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, ProfileView, PetViewSet, AdoptionRequestViewSet, GalleryViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView
from .token_views import CustomTokenObtainPairView

# Create router and register viewsets
router = DefaultRouter()
router.register(r'pets', PetViewSet)
router.register(r'gallery', GalleryViewSet)
router.register(r'adoption-requests', AdoptionRequestViewSet)

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User profile
    path('profile/', ProfileView.as_view(), name='profile'),
    
    # Include router URLs for ViewSets
    path('', include(router.urls)),
]
