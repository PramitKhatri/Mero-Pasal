# Generated by Django 4.2.1 on 2023-08-04 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0003_sellertoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seller',
            name='seller_image',
            field=models.FileField(null=True, upload_to='seller/sellerImage'),
        ),
        migrations.AlterField(
            model_name='seller',
            name='seller_verification',
            field=models.FileField(null=True, upload_to='seller/sellerVerification'),
        ),
    ]
