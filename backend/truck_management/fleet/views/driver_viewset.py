from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from django.db.models import Count
from ..models import Driver
from ..serializers import DriverSerializer

class SmallPageNumberPagination(PageNumberPagination):
    page_size = 12
    
class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all().order_by('-id').annotate(assignments_count=Count('assignments'))
    serializer_class = DriverSerializer
    pagination_class = SmallPageNumberPagination
    
    def list(self, request, *args, **kwargs):
        if request.query_params.get('all') == 'true':
            self.pagination_class = None
        return super().list(request, *args, **kwargs)