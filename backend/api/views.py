from rest_framework import generics, permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Pet, AdoptionRequest, GalleryImage
from .serializers import (
    UserSerializer, RegisterSerializer, PetSerializer,
    AdoptionRequestSerializer, GalleryImageSerializer
)
from rest_framework.decorators import action

# Auth
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)
    def put(self, request):
        user = request.user
        user.email = request.data.get('email', user.email)
        user.save()
        return Response(UserSerializer(user).data)

# Pets
class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        if self.action == 'my_pets':
            return Pet.objects.filter(owner=self.request.user)
        return Pet.objects.all()

    @action(detail=False, methods=['get'], url_path='my-pets')
    def my_pets(self, request):
        pets = Pet.objects.filter(owner=request.user)
        serializer = self.get_serializer(pets, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        pet = self.get_object()
        if pet.owner != request.user:
            return Response({'detail': 'Not allowed'}, status=403)
        return super().destroy(request, *args, **kwargs)

# Adoption
class AdoptionRequestViewSet(viewsets.ModelViewSet):
    queryset = AdoptionRequest.objects.all()
    serializer_class = AdoptionRequestSerializer

    def get_permissions(self):
        if self.action in ['list', 'update']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='my-adoption-requests')
    def my_requests(self, request):
        requests = AdoptionRequest.objects.filter(user=request.user)
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put'], url_path='admin/adoption-requests')
    def admin_update(self, request, pk=None):
        adoption_request = self.get_object()
        status_val = request.data.get('status')
        if status_val in dict(AdoptionRequest.STATUS_CHOICES):
            adoption_request.status = status_val
            adoption_request.save()
            return Response(self.get_serializer(adoption_request).data)
        return Response({'detail': 'Invalid status'}, status=400)

# Gallery
class GalleryViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action in ['list']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)