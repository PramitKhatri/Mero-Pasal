# Generated by Django 4.2.1 on 2024-01-02 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userorders', '0010_remove_orderitem_payment_status_order_payment_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='order_status',
            field=models.CharField(choices=[('pending', 'pending'), ('shipped', 'shipped'), ('canceled', 'canceled'), ('delivered', 'delivered')], default='pending', max_length=100),
        ),
    ]
