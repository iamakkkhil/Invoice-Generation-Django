from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=1)

    def __str__(self):
        return self.name