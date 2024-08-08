# Generated by Django 5.0.2 on 2024-08-01 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_user_is_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False, verbose_name='Является ли пользователь подтвержденным'),
        ),
    ]
