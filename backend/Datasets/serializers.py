from rest_framework import serializers

from Datasets.models import Data, Dataset

class DatasetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dataset
        fields = ['id','name','file','columns_data']
        read_only_fields = ['id','columns_data']

class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = '__all__'