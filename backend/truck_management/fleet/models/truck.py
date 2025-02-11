from django.db import models


class Truck(models.Model):
    """
    Represents a truck in the fleet.

    minimum_license_required attribute: The minimum license type required to 
    operate the truck.
        Valid values are 'A', 'B', 'C', 'D', or 'E'.
    """
    
    LICENSE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('E', 'E'),
    ]
    
    plate = models.CharField(
        verbose_name='Truck plate',
        max_length=20, 
        unique=True
    )
    
    minimum_license_required = models.CharField(
        verbose_name='Minimum license required',
        max_length=1, 
        choices=LICENSE_CHOICES
    )


    ################## Class Methods ##################
    def __str__(self):
        return f"Truck plate: {self.plate} | Min: {self.minimum_license_required}"
