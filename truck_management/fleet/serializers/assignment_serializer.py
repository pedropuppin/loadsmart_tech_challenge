from rest_framework import serializers
from ..models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

    def validate(self, data):
        driver = data.get('driver')
        truck = data.get('truck')
        assignment_date = data.get('date')

        # check that the driver's license is sufficient
        if driver and truck:
            driver_level = Assignment.LICENSE_LEVELS.get(driver.license_type)
            truck_level = Assignment.LICENSE_LEVELS.get(truck.minimum_license_required)
            if driver_level < truck_level:
                raise serializers.ValidationError("Driver's license type is not sufficient for the truck.")

        # check that the driver is not assigned to another truck on the same date
        qs_driver = Assignment.objects.filter(driver=driver, date=assignment_date)
        # exclude current instance in case of updates
        if self.instance:
            qs_driver = qs_driver.exclude(pk=self.instance.pk)
        if qs_driver.exists():
            raise serializers.ValidationError("This driver is already assigned on this date.")

        # check that the truck is not assigned to another driver on the same date
        qs_truck = Assignment.objects.filter(truck=truck, date=assignment_date)
        if self.instance:
            qs_truck = qs_truck.exclude(pk=self.instance.pk)
        if qs_truck.exists():
            raise serializers.ValidationError("This truck is already assigned on this date.")

        return data