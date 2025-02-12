from django.contrib import admin
from ..models import Assignment


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = [
        'id',
		'driver',
		'truck',
		'date',
	]
    
    search_fields = [
		'driver',
		'truck',
	]