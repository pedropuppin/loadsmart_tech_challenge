from rest_framework import serializers
from ..models import Driver


class DriverSerializer(serializers.ModelSerializer):
    assignments_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Driver
        fields = ('id', 'name', 'license_type', 'assignments_count')