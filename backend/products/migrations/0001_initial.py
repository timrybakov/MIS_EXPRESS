# Generated by Django 5.0.2 on 2024-06-24 10:18

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product_components', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='products-images/', verbose_name='Картинка товара')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название товара')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание товара')),
                ('article_number', models.CharField(max_length=10, verbose_name='Артикул')),
                ('amount', models.PositiveIntegerField(verbose_name='Количество товара')),
                ('compound', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Состав товара')),
                ('price', models.DecimalField(db_index=True, decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(0, message='the price cannot be a negative number')], verbose_name='Цена товара')),
                ('season', models.CharField(blank=True, choices=[('S', 'Summer'), ('W', 'Winter'), ('DS', 'Demi-season'), ('AS', 'All-season')], null=True, verbose_name='Сезон для ношения')),
                ('pattern', models.CharField(blank=True, max_length=50, null=True, verbose_name='Узор товара')),
                ('slug', models.SlugField(blank=True, max_length=1024, unique=True, verbose_name='Слаг товара')),
                ('is_famous', models.BooleanField(verbose_name='Популярный товар?')),
                ('status', models.CharField(choices=[('UC', 'Under consideration'), ('R', 'Rejected'), ('A', 'Accepted')], verbose_name='Статус проверки модерацией')),
                ('date_and_time', models.DateTimeField(auto_now_add=True, verbose_name='Время и дата публикации')),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product_components.brand', verbose_name='Бренд товара')),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product_components.color', verbose_name='Цвет товара')),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.images', verbose_name='Галерея')),
                ('manufacturerCountry', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='product_components.manufacturercountry', verbose_name='Страна производителя товара')),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'ordering': ['-slug'],
            },
        ),
    ]
