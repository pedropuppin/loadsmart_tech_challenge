from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
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
        validators = [
            UniqueTogetherValidator(
                queryset=Assignment.objects.all(),
                fields=['driver', 'date'],
                message="This driver is already assigned on this date."
            ),
            UniqueTogetherValidator(
                queryset=Assignment.objects.all(),
                fields=['truck', 'date'],
                message="This truck is already assigned on this date."
            )
        ]

    def validate(self, data):
        """
            This method checks that the driver's license level is sufficient 
            for the truck's minimum license requirement. The uniqueness of the 
            combination of driver, truck, and date is already enforced at the 
            DB level via unique constraints, and any integrity error 
            arising from that is captured and transformed by the UniqueTogetherValidator.
        """
        driver = data.get('driver')
        truck = data.get('truck')
        
        # check that the driver's license is sufficient.
        if driver and truck:
            driver_level = Assignment.LICENSE_LEVELS.get(driver.license_type)
            truck_level = Assignment.LICENSE_LEVELS.get(truck.minimum_license_required)
            if driver_level < truck_level:
                raise serializers.ValidationError("Driver's license type is not sufficient for the truck.")

        return data
    