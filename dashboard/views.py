from django.shortcuts import render


def dashboard(request):
    return render(request, 'dashboard/home.html', {'page_title': 'Dashboard', 'active_page': 'dashboard'})

def inventory(request):
    return render(request, 'dashboard/inventory.html', {'page_title': 'Inventory Management', 'active_page': 'inventory'})

def warehouse(request):
    return render(request, 'dashboard/warehouse.html', {'page_title': 'Warehouse Overview', 'active_page': 'warehouse'})

def products(request):
    return render(request, 'dashboard/products.html', {'page_title': 'Products', 'active_page': 'products'})

def orders(request):
    return render(request, 'dashboard/orders.html', {'page_title': 'Orders', 'active_page': 'orders'})

def dispatch(request):
    return render(request, 'dashboard/dispatch.html', {'page_title': 'Dispatch Management', 'active_page': 'dispatch'})

def incoming_shipments(request):
    return render(request, 'dashboard/incoming_shipments.html', {'page_title': 'Incoming Shipments', 'active_page': 'incoming'})

def outgoing_shipments(request):
    return render(request, 'dashboard/outgoing_shipments.html', {'page_title': 'Outgoing Shipments', 'active_page': 'outgoing'})

def reports(request):
    return render(request, 'dashboard/reports.html', {'page_title': 'Reports & Analytics', 'active_page': 'reports'})

def sales_analytics(request):
    return render(request, 'dashboard/sales_analytics.html', {'page_title': 'Sales Analytics', 'active_page': 'sales'})

def staff(request):
    return render(request, 'dashboard/staff.html', {'page_title': 'Staff Management', 'active_page': 'staff'})

def customers(request):
    return render(request, 'dashboard/customers.html', {'page_title': 'Customer Management', 'active_page': 'customers'})

def notifications(request):
    return render(request, 'dashboard/notifications.html', {'page_title': 'Notifications', 'active_page': 'notifications'})

def settings_page(request):
    return render(request, 'dashboard/settings.html', {'page_title': 'Settings', 'active_page': 'settings'})

def profile(request):
    return render(request, 'dashboard/profile.html', {'page_title': 'My Profile', 'active_page': 'profile'})

def activity_logs(request):
    return render(request, 'dashboard/activity_logs.html', {'page_title': 'Activity Logs', 'active_page': 'activity'})
