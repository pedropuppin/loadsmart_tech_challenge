from django.db import models
from django.core.exceptions import ValidationError


class Assignment(models.Model):
    LICENSE_LEVELS = {
        'A': 1,
        'B': 2,
        'C': 3,
        'D': 4,
        'E': 5
    }
    
    driver = models.ForeignKey(
        'Driver', 
        on_delete=models.CASCADE, 
        related_name='assignments'
    )
    
    truck = models.ForeignKey(
        'Truck', 
        on_delete=models.CASCADE, 
        related_name='assignments'
    )
    
    date = models.DateField()
    
    
    ################## Class Methods ##################
    def clean(self):
        """
        - validate license compatibility.
        - ensure a driver and a truck are not double-booked on the same date.
        """
        driver_license_level = self.LICENSE_LEVELS.get(self.driver.license_type)
        truck_license_level = self.LICENSE_LEVELS.get(self.truck.minimum_license_required)
        
        if driver_license_level < truck_license_level:
            raise ValidationError("Driver's license type is not sufficient for the truck.")

        if Assignment.objects.exclude(pk=self.pk).filter(driver=self.driver, date=self.date).exists():
            raise ValidationError("This driver is already assigned on this date.")

        if Assignment.objects.exclude(pk=self.pk).filter(truck=self.truck, date=self.date).exists():
            raise ValidationError("This truck is already assigned on this date.")

    def save(self, *args, **kwargs):
        # call clean on save() to ensure validations
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.driver} assigned to {self.truck} on {self.date}"

    class Meta:
        # Extra layer of protection at the database level.
        constraints = [
            models.UniqueConstraint(fields=['driver', 'date'], name='unique_driver_date'),
            models.UniqueConstraint(fields=['truck', 'date'], name='unique_truck_date'),
        ]