from rest_framework import serializers
from ..models import Truck


class TruckSerializer(serializers.ModelSerializer):
    assignments_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Truck
        fields = ('id', 'plate', 'minimum_license_required', 'assignments_count')