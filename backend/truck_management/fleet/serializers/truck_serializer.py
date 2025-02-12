from rest_framework import serializers
from ..models import Truck


class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Truck
        fields = ('id', 'plate', 'minimum_license_required')