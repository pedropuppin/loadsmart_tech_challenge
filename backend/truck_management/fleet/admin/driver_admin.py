from django.contrib import admin
from ..models import Driver


@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = [
		'name',
		'license_type',
	]
    
    search_fields = [
		'license_type',
	]