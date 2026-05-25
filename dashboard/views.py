from django.shortcuts import render


def dashboard(request):
    return render(request, 'dashboard/home.html', {'page_title': 'Dashboard', 'active_page': 'dashboard'})

def warehouse(request):
    return render(request, 'dashboard/warehouse.html', {'page_title': 'Warehouse Units', 'active_page': 'warehouse'})

def tenants(request):
    return render(request, 'dashboard/tenants.html', {'page_title': 'Tenant Management', 'active_page': 'tenants'})

def leases(request):
    return render(request, 'dashboard/leases.html', {'page_title': 'Lease Management', 'active_page': 'leases'})

def rent_payments(request):
    return render(request, 'dashboard/rent_payments.html', {'page_title': 'Rent & Payments', 'active_page': 'rent_payments'})

def reports(request):
    return render(request, 'dashboard/reports.html', {'page_title': 'Reports & Analytics', 'active_page': 'reports'})

def tickets(request):
    return render(request, 'dashboard/tickets.html', {'page_title': 'Support Tickets', 'active_page': 'tickets'})

def staff(request):
    return render(request, 'dashboard/staff.html', {'page_title': 'Staff Management', 'active_page': 'staff'})

def notifications(request):
    return render(request, 'dashboard/notifications.html', {'page_title': 'Notifications', 'active_page': 'notifications'})

def settings_page(request):
    return render(request, 'dashboard/settings.html', {'page_title': 'Settings', 'active_page': 'settings'})

def profile(request):
    return render(request, 'dashboard/profile.html', {'page_title': 'My Profile', 'active_page': 'profile'})

def activity_logs(request):
    return render(request, 'dashboard/activity_logs.html', {'page_title': 'Activity Logs', 'active_page': 'activity'})
