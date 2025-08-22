from django.contrib import admin
from .models import Pet, AdoptionRequest, GalleryImage

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'breed', 'age', 'owner', 'available')
    search_fields = ('name', 'type', 'breed', 'owner__username')
    list_filter = ('type', 'available')

@admin.register(AdoptionRequest)
class AdoptionRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'pet', 'status', 'created_at')
    search_fields = ('user__username', 'pet__name')
    list_filter = ('status',)

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'uploaded_by', 'uploaded_at')
    search_fields = ('uploaded_by__username',)