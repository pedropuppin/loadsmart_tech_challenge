from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from ..models import Driver
from ..serializers import DriverSerializer

class SmallPageNumberPagination(PageNumberPagination):
    page_size = 15
    
class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    pagination_class = SmallPageNumberPagination