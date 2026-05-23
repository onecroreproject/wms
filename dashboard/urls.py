from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('inventory/', views.inventory, name='inventory'),
    path('warehouse/', views.warehouse, name='warehouse'),
    path('products/', views.products, name='products'),
    path('orders/', views.orders, name='orders'),
    path('dispatch/', views.dispatch, name='dispatch'),
    path('incoming-shipments/', views.incoming_shipments, name='incoming_shipments'),
    path('outgoing-shipments/', views.outgoing_shipments, name='outgoing_shipments'),
    path('reports/', views.reports, name='reports'),
    path('sales-analytics/', views.sales_analytics, name='sales_analytics'),
    path('staff/', views.staff, name='staff'),
    path('customers/', views.customers, name='customers'),
    path('notifications/', views.notifications, name='notifications'),
    path('settings/', views.settings_page, name='settings'),
    path('profile/', views.profile, name='profile'),
    path('activity-logs/', views.activity_logs, name='activity_logs'),
]
