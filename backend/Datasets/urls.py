from django.urls import path, include
from Datasets import views

urlpatterns = [
    path('dataset', views.DatasetAPI.as_view(),name='dataset-list-create'),
    path('dataset/<int:pk>/compute',views.DataComputeAPI.as_view(),name='data-list'),
    path('dataset/<int:pk>/plot',views.DataPlotAPI.as_view(),name='data-list')
] 