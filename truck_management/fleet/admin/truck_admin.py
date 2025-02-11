from django.contrib import admin
from ..models import Truck


@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    list_display = [
		'plate',
		'minimum_license_required',
	]
    