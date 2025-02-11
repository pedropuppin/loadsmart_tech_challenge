import random
import string
from faker import Faker

from django.core.management.base import BaseCommand

from fleet.models.driver import Driver
from fleet.models.truck import Truck


class Command(BaseCommand):
    help = 'Seeds the database with sample drivers and trucks'

    def add_arguments(self, parser):
        parser.add_argument(
            '--drivers', 
            type=int, 
            default=10, 
            help='Number of drivers to create'
        )
        
        parser.add_argument(
            '--trucks', 
            type=int, 
            default=5, 
            help='Number of trucks to create'
        )

    def handle(self, *args, **options):
        num_drivers = options['drivers']
        num_trucks = options['trucks']

        # clear existing data for a fresh start.
        Driver.objects.all().delete()
        Truck.objects.all().delete()

        license_choices = ['A', 'B', 'C', 'D', 'E']
        fake = Faker()

        def generate_plate():
            """
            Generates a random license plate consisting of three uppercase letters
            followed by a hyphen and three digits, e.g. "XYZ-123".
            """
            letters = ''.join(random.choices(string.ascii_uppercase, k=3))
            numbers = ''.join(random.choices(string.digits, k=3))
            return f"{letters}-{numbers}"

        # create sample drivers.
        for i in range(num_drivers):
            name = fake.name()
            license_type = random.choice(license_choices)
            Driver.objects.create(name=name, license_type=license_type)
            self.stdout.write(
                self.style.SUCCESS(f"Created driver: {name} with license: {license_type}")
            )

        # create sample trucks plates.
        for i in range(num_trucks):
            plate = generate_plate()
            minimum_license_required = random.choice(license_choices)
            Truck.objects.create(plate=plate, minimum_license_required=minimum_license_required)
            self.stdout.write(
                self.style.SUCCESS(f"Created truck: {plate} with minimum license: {minimum_license_required}")
            )

        self.stdout.write(self.style.SUCCESS("Seeding complete."))