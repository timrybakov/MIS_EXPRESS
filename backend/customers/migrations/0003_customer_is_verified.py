# Generated by Django 5.0.2 on 2024-08-01 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_alter_review_options_alter_review_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='is_verified',
            field=models.BooleanField(default=False, verbose_name='Является ли пользователь верифицированным'),
        ),
    ]
