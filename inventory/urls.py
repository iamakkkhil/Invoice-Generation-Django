from django.urls import path, include, re_path
from . import views


urlpatterns = [
    path('getItems/', views.getItems, name="getItems"),
    path('', views.index, name="index"),
    path('add/', views.index, name="Add"),
    # path('<path:route>', views.index),
    # re_path(r'^(?:.*)/?$', views.index)
    
]
