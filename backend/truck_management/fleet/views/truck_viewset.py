from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from django.db.models import Count
from ..models import Truck
from ..serializers import TruckSerializer

class SmallPageNumberPagination(PageNumberPagination):
    page_size = 12

class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all().order_by('-id').annotate(assignments_count=Count('assignments'))
    serializer_class = TruckSerializer
    pagination_class = SmallPageNumberPagination
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get('all') == 'true':
            self.pagination_class = None  # Desativa a paginação
        return super().list(request, *args, **kwargs)
