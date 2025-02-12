from rest_framework import serializers
from django.db import IntegrityError, transaction

from ..models import Assignment, Driver, Truck
from .driver_serializer import DriverSerializer
from .truck_serializer import TruckSerializer


class AssignmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Assignment model.

    This serializer converts Assignment model instances to JSON format and 
    validates the data ensuring that:
      - The driver's license type is sufficient for the truck's required minimum license.
      - The same driver or truck is not assigned more than once on the same date.
    """
    driver_detail = DriverSerializer(source='driver', read_only=True)
    truck_detail = TruckSerializer(source='truck', read_only=True)
    
    driver = serializers.PrimaryKeyRelatedField(queryset=Driver.objects.all())
    truck = serializers.PrimaryKeyRelatedField(queryset=Truck.objects.all())
    
    class Meta:
        model = Assignment
        fields = ('id', 'driver', 'truck', 'driver_detail', 'truck_detail', 'date')

    def validate(self, data):
        """
        Validates the assignment data before saving.

        Args:
            data (dict): The data to be validated, which should include the 'driver', 'truck', and 'date'.

        Returns:
            dict: The validated data.
        """
        driver = data.get('driver')
        truck = data.get('truck')
        assignment_date = data.get('date')
        
        # check that the driver's license is sufficient.
        if driver and truck:
            driver_level = Assignment.LICENSE_LEVELS.get(driver.license_type)
            truck_level = Assignment.LICENSE_LEVELS.get(truck.minimum_license_required)
            if driver_level < truck_level:
                raise serializers.ValidationError("Driver's license type is not sufficient for the truck.")
        
        # check that the driver is not assigned to another truck on the same date.
        qs_driver = Assignment.objects.filter(driver=driver, date=assignment_date)
        if self.instance:
            # prevents the serializer from comparing the record against itself
            qs_driver = qs_driver.exclude(pk=self.instance.pk)
        if qs_driver.exists():
            raise serializers.ValidationError("This driver is already assigned on this date.")

        # check that the truck is not assigned to another driver on the same date.
        qs_truck = Assignment.objects.filter(truck=truck, date=assignment_date)
        if self.instance:
            qs_truck = qs_truck.exclude(pk=self.instance.pk)
        if qs_truck.exists():
            raise serializers.ValidationError("This truck is already assigned on this date.")

        return data