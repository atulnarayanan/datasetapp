from email.policy import default
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Dataset(models.Model):
    file = models.FileField(upload_to='datasets/')
    name = models.CharField(max_length=200,blank=False,null=False)
    columns_data = models.JSONField(blank=False,null=False)

class Data(models.Model):
    dataset = models.ForeignKey('Datasets.Dataset',on_delete=models.CASCADE,related_name='data')
    data = models.JSONField(null=True)