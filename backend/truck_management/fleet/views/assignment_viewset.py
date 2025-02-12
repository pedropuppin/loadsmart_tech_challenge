from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from ..models import Assignment
from ..serializers import AssignmentSerializer


class SmallPageNumberPagination(PageNumberPagination):
    page_size = 15

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    pagination_class = SmallPageNumberPagination
