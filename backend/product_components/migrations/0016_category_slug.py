# Generated by Django 5.0.2 on 2024-07-20 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_components', '0015_rename_producttranslation_categorytranslation'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, max_length=1024, unique=True, verbose_name='Слаг категории'),
        ),
    ]
