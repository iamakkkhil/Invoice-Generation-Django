# Generated by Django 3.2.7 on 2021-09-16 05:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_auto_20210915_1732'),
        ('bills', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='purchased_items_obj',
        ),
        migrations.AddField(
            model_name='customer',
            name='purchased_items_obj',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bills.itempurchased'),
        ),
        migrations.AlterField(
            model_name='itempurchased',
            name='items_obj',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.item'),
        ),
    ]
