# Generated by Django 5.0.2 on 2024-07-31 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0037_alter_product_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producttranslation',
            name='compound',
            field=models.TextField(blank=True, null=True, verbose_name='Состав товара'),
        ),
    ]
