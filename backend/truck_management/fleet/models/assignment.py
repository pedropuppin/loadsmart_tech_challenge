from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError


class Assignment(models.Model):
    """
    Represents an assignment of a driver to a truck on a given date.
    
    This model ensures:
      - The driver's license is compatible with the truck's required minimum license.
      - A driver or truck is not double-booked on the same date.
    """
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
        - checks that the driver's license level meets or exceeds the truck's required license level.
        - ensures that the driver is not assigned to more than one truck on the same date.
        - ensures that the truck is not assigned to more than one driver on the same date.
        """
        driver_license_level = self.LICENSE_LEVELS.get(self.driver.license_type)
        truck_license_level = self.LICENSE_LEVELS.get(self.truck.minimum_license_required)
        
        if driver_license_level < truck_license_level:
            raise ValidationError("Driver's license type is not sufficient for the truck.")
        
        # finds other assignments tha contains the same driver or truck in the same date
        conflicts = Assignment.objects.exclude(pk=self.pk).filter(
            date=self.date
        ).filter(
            Q(driver=self.driver) | Q(truck=self.truck)
        )
    
        # iterate over the conflicting assignments and raise errors
        for conflict in conflicts:
            if conflict.driver == self.driver:
                raise ValidationError("This driver is already assigned on this date.")
            if conflict.truck == self.truck:
                raise ValidationError("This truck is already assigned on this date.")

    def save(self, *args, **kwargs):
        """
        Overrides the save method to run validations before saving.
        """
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.driver} assigned to {self.truck} on {self.date}"

    class Meta:
        """
        Defines unique constraints to enforce that a driver or a truck cannot 
        have multiple assignments on the same date.
        """
        constraints = [
            models.UniqueConstraint(fields=['driver', 'date'], name='unique_driver_date'),
            models.UniqueConstraint(fields=['truck', 'date'], name='unique_truck_date'),
        ]