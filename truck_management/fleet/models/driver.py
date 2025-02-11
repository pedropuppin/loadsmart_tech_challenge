from django.db import models


class Driver(models.Model):
    """
    Represents a driver in the fleet management system.

    license_type attribute: The type of license the driver holds. It must be one 
    of the following:
        'A', 'B', 'C', 'D', or 'E'.
    """
    LICENSE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('E', 'E'),
    ]
    
    name = models.CharField(
        verbose_name='Drive name',
        max_length=255,
    )
    
    license_type = models.CharField(
        verbose_name='License type',
        max_length=1, 
        choices=LICENSE_CHOICES
    )
    
    
    ################## Class Methods ##################
    def __str__(self):
        return f"{self.name} | {self.license_type}"