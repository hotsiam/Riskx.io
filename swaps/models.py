from django.db import models

# Create your models here.
class Swap(models.Model):
	image = models.ImageField(upload_to='images/', null=True, blank=True)
	summary = models.CharField(max_length=200)

