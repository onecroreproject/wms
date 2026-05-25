from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('warehouse/', views.warehouse, name='warehouse'),
    path('tenants/', views.tenants, name='tenants'),
    path('leases/', views.leases, name='leases'),
    path('rent-payments/', views.rent_payments, name='rent_payments'),
    path('reports/', views.reports, name='reports'),
    path('tickets/', views.tickets, name='tickets'),
    path('staff/', views.staff, name='staff'),
    path('notifications/', views.notifications, name='notifications'),
    path('settings/', views.settings_page, name='settings'),
    path('profile/', views.profile, name='profile'),
    path('activity-logs/', views.activity_logs, name='activity_logs'),
]
