import io, os, ast
import urllib.parse
import pandas as pd
from rest_framework import generics, status, validators
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FileUploadParser
from Datasets.serializers import DataSerializer, DatasetSerializer
from Datasets.models import Dataset, Data
from django.contrib.postgres.fields.jsonb import KeyTransform
from django.db.models import Max, Min, Sum
from django.db.models.functions import Cast
from django.db.models import Func, F, FloatField, IntegerField
from django.db.models.expressions import Value

class DatasetAPI(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser]
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        file_format = os.path.splitext(file.name)[-1]

        if file_format != '.csv':
            raise validators.ValidationError('Error: The File must be a csv file')

        decoded_file = file.read().decode()
        io_string = io.StringIO(decoded_file)
        df = pd.read_csv(io_string)
        column_types = df.dtypes.apply(lambda x: x.name).to_dict()

        column_conv = {
            'int64': 'int',
            'float64': 'flo',
            'object': 'obj'
        }

        column = {}
        for keys in column_types:
            column[keys] = column_conv[column_types[keys]]

        obj = serializer.save(columns_data=column)

        values_dict = df.to_dict('index')
        values = list(values_dict.values())
        data_total = []
        for rows in values:
            data = Data(dataset_id=obj.id,data=rows)
            data_total.append(data)
        Data.objects.bulk_create(data_total,batch_size=500)
        return Response('Dataset imported Successfully',status=status.HTTP_201_CREATED)

class DataComputeAPI(generics.GenericAPIView):
    serializer_class = DataSerializer

    def post(self, request, *args, **kwargs):
        col_name = request.data.get('column_name')
        dataset = Dataset.objects.get(id=self.kwargs['pk'])

        if not request.data.get('column_name'):
            raise validators.ValidationError('missing column_name')

        for key, val in dataset.columns_data.items():
            if key == col_name:
                col_dtype = val
                if val == 'obj':
                    raise validators.ValidationError('Not a valid column type. Please pick a integer or float column.')

        type_choices = {
            'int': IntegerField(),
            'flo': FloatField()
        }

        operation_choices = {
            'max': Max('val'),
            'min': Min('val'),
            'sum': Sum('val')
        }

        compute = Data.objects.filter(dataset_id=self.kwargs['pk']).annotate(val=Cast(KeyTransform(col_name, 'data'),type_choices[col_dtype])).aggregate(output=operation_choices[request.data.get('operation')])
        return Response(compute,status=status.HTTP_200_OK)

class DataPlotAPI(generics.GenericAPIView):
    serializer_class = DataSerializer

    def get(self, request, *args, **kwargs):
        queryparams = request.query_params.get('fields')
        unencoded = urllib.parse.unquote(queryparams)
        col_list = ast.literal_eval(unencoded)

        if not col_list:
            raise validators.ValidationError('missing column_name')

        dataset = Dataset.objects.get(id=self.kwargs['pk'])

        col_indx = []
        col_dtypes = []

        for key, val in dataset.columns_data.items():
            if key in col_list:
                col_indx.append(key) 
                col_dtypes.append(val)
                if val == 'obj':
                    raise validators.ValidationError('Not a valid column type. Please pick a integer or float column.')

        data = Data.objects.filter(dataset_id=self.kwargs['pk']).values(f'data__{col_list[0]}',f'data__{col_list[1]}')
        return Response(data,status=status.HTTP_200_OK)