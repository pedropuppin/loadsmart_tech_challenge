from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from ..models import Assignment
from ..serializers import AssignmentSerializer


class SmallPageNumberPagination(PageNumberPagination):
    page_size = 12

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all().order_by('-id')
    serializer_class = AssignmentSerializer
    pagination_class = SmallPageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['driver', 'truck']
