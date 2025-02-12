from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from ..models import Truck
from ..serializers import TruckSerializer

class SmallPageNumberPagination(PageNumberPagination):
    page_size = 15

class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    pagination_class = SmallPageNumberPagination
