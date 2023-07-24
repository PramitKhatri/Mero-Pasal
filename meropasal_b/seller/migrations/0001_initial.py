# Generated by Django 4.2.1 on 2023-07-20 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('seller_desc', models.TextField()),
                ('seller_image', models.FileField(null=True, upload_to='static/uploads/sellers')),
                ('seller_verification', models.FileField(null=True, upload_to='static/uploads/sellerVerification')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.BooleanField(default=False, null=True)),
                ('groups', models.ManyToManyField(related_name='seller_users', to='auth.group')),
                ('user_permissions', models.ManyToManyField(related_name='seller_users', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]