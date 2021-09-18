from django.db import models


class ItemPurchased(models.Model):
    product_name = models.CharField(max_length=1000, default="item")
    product_price = models.DecimalField(
        max_digits=7, decimal_places=1, default=0.0)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.product_name}  -  {self.quantity}"


class Customer(models.Model):
    customer_name = models.CharField(max_length=1000)
    contact_no = models.IntegerField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    purchased_items_obj = models.ManyToManyField('ItemPurchased', blank=True)
    total_amount = models.DecimalField(
        null=True, blank=True, default=0.0, max_digits=7, decimal_places=1)

    def __str__(self):
        return f"{self.customer_name}  -  {self.total_amount}"
