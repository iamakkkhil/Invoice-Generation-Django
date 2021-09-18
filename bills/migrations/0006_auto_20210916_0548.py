# Generated by Django 3.2.7 on 2021-09-16 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0005_auto_20210916_0547'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itempurchased',
            name='customer_name',
        ),
        migrations.AddField(
            model_name='customer',
            name='purchased_items_obj',
            field=models.ManyToManyField(blank=True, to='bills.ItemPurchased'),
        ),
    ]
