from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from ..models import Truck
from ..serializers import TruckSerializer

class SmallPageNumberPagination(PageNumberPagination):
    page_size = 15

class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all().order_by('-id')
    serializer_class = TruckSerializer
    pagination_class = SmallPageNumberPagination
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get('all') == 'true':
            self.pagination_class = None  # Desativa a paginação
        return super().list(request, *args, **kwargs)
