from django.db import models

# Create your models here.

# title
# pub_date
# body
# image

class Blog(models.Model):
	title = models.CharField(max_length=255)
	pub_date = models.DateTimeField()
	body = models.TextField()
	image = models.ImageField(upload_to='images/', null=True, blank=True)
# Add the Blog app to the settings

# Create a Migration

# Migrate

# Add to the admin