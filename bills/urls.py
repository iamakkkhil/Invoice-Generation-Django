from django.urls import path, include
from . import views
from .pdfGenerater import invoicePdf

urlpatterns = [
    path('api/CustomerBills/', views.CustomerPurchases, name="CustomerPurchases"),
    path('api/AddCustomer/', views.AddCustomerPurchase, name="AddCustomerPurchase"),
    path('api/view-bill/<str:id>/', views.ViewBill, name="ViewBill"),
    path('api/edit-bill/<str:id>/', views.EditBill, name="EditBill"),
    path('download/<str:id>/', invoicePdf, name="Download"),
]