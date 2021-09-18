from django.urls import path, include
from . import views

urlpatterns = [
    path('getItems/', views.getItems, name="getItems"),
]
