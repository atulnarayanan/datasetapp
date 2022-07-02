from django.contrib import admin

from Datasets.models import Dataset, Data

# Register your models here.

admin.site.register(Dataset)
admin.site.register(Data)