# Generated by Django 4.2.1 on 2023-07-24 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='seller',
            name='company_name',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]