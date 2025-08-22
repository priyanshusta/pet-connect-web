from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Pet, AdoptionRequest, GalleryImage

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

# Custom JWT serializer to include user information in the response
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add user information to the response
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'is_staff': self.user.is_staff
        }
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class PetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    photo = serializers.ImageField(required=False)

    class Meta:
        model = Pet
        fields = '__all__'

class AdoptionRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    pet = PetSerializer(read_only=True)
    pet_id = serializers.PrimaryKeyRelatedField(
        queryset=Pet.objects.all(), source='pet', write_only=True
    )

    class Meta:
        model = AdoptionRequest
        fields = ['id', 'user', 'pet', 'pet_id', 'status', 'message', 'created_at']

class GalleryImageSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)

    class Meta:
        model = GalleryImage
        fields = ['id', 'image', 'caption', 'uploaded_by', 'uploaded_at']