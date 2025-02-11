from datetime import date

from django.test import TestCase
from django.core.exceptions import ValidationError

from fleet.models.driver import Driver
from fleet.models.truck import Truck
from fleet.models.assignment import Assignment

class AssignmentModelTestCase(TestCase):
    def setUp(self):
        # Create sample drivers
        self.driver1 = Driver.objects.create(name="John Doe", license_type="C")
        self.driver2 = Driver.objects.create(name="Jane Smith", license_type="D")
        
        # Create sample trucks
        # testing valid assignment
        self.truck1 = Truck.objects.create(plate="ABC-123", minimum_license_required="B")
        # testing insufficient license scenario
        self.truck2 = Truck.objects.create(plate="XYZ-789", minimum_license_required="D")

    def test_valid_assignment(self):
        """
        Test that an assignment is valid when the driver's license meets the truck's requirement
        and there are no conflicting assignments on the same date
        """
        assignment = Assignment(driver=self.driver1, truck=self.truck1, date=date(2025, 1, 1))
        # should pass without raising an error.
        assignment.clean()
        assignment.save()
        self.assertEqual(Assignment.objects.count(), 1)

    def test_insufficient_license(self):
        """
        Test that an assignment fails if the driver's license is not sufficient for the truck.
        In this test, driver1 (license "C") should not be able to drive truck2 (requires "D").
        """
        assignment = Assignment(driver=self.driver1, truck=self.truck2, date=date(2025, 1, 2))
        with self.assertRaises(ValidationError) as context:
            assignment.clean()
        self.assertIn("Driver's license type is not sufficient for the truck.", str(context.exception))

    def test_double_booking_driver(self):
        """
        Test that a driver cannot be assigned to more than one truck on the same date.
        """
        # First valid assignment for driver1 on a given date.
        assignment1 = Assignment(driver=self.driver1, truck=self.truck1, date=date(2025, 1, 3))
        assignment1.clean()
        assignment1.save()

        # Attempt a second assignment for driver1 on the same date with a different truck.
        assignment2 = Assignment(driver=self.driver1, truck=self.truck2, date=date(2025, 1, 3))
        with self.assertRaises(ValidationError) as context:
            assignment2.clean()
        self.assertIn("This driver is already assigned on this date.", str(context.exception))

    def test_double_booking_truck(self):
        """
        Test that a truck cannot be assigned to more than one driver on the same date.
        """
        # First valid assignment for truck1 on a given date.
        assignment1 = Assignment(driver=self.driver1, truck=self.truck1, date=date(2025, 1, 4))
        assignment1.clean()
        assignment1.save()
        
        # Create a new truck that driver1 is eligible for
        truck3 = Truck.objects.create(plate="DEF-456", minimum_license_required="B")
    
        # Attempt a second assignment for truck1 on the same date with a different driver.
        assignment2 = Assignment(driver=self.driver1, truck=truck3, date=date(2025, 1, 3))
        with self.assertRaises(ValidationError) as context:
            assignment2.clean()
        self.assertIn("This truck is already assigned on this date.", str(context.exception))