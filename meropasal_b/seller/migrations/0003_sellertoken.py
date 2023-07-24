# Generated by Django 4.2.1 on 2023-07-24 09:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0003_tokenproxy'),
        ('seller', '0002_seller_company_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='SellerToken',
            fields=[
                ('token_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authtoken.token')),
                ('seller', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='auth_token', to='seller.seller')),
            ],
            bases=('authtoken.token',),
        ),
    ]