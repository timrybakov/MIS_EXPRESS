# Generated by Django 5.0.2 on 2024-07-02 15:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0012_alter_productstatuschangearchive_new_status_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productstatuschangearchive',
            options={'ordering': ['id']},
        ),
        migrations.RemoveField(
            model_name='product',
            name='compound',
        ),
        migrations.RemoveField(
            model_name='product',
            name='description',
        ),
        migrations.RemoveField(
            model_name='product',
            name='name',
        ),
        migrations.AlterField(
            model_name='product',
            name='fifth_image',
            field=models.ImageField(default=None, null=True, upload_to='', verbose_name='Пятая картинка товара'),
        ),
        migrations.AlterField(
            model_name='product',
            name='first_image',
            field=models.ImageField(default=None, null=True, upload_to='', verbose_name='Первая картинка товара'),
        ),
        migrations.AlterField(
            model_name='product',
            name='fourth_image',
            field=models.ImageField(default=None, null=True, upload_to='', verbose_name='Четвертая картинка товара'),
        ),
        migrations.AlterField(
            model_name='product',
            name='second_image',
            field=models.ImageField(default=None, null=True, upload_to='', verbose_name='Вторая картинка товара'),
        ),
        migrations.AlterField(
            model_name='product',
            name='third_image',
            field=models.ImageField(default=None, null=True, upload_to='', verbose_name='Третья картинка товара'),
        ),
        migrations.CreateModel(
            name='ProductTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название товара')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание товара')),
                ('compound', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Состав товара')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('master', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.product')),
            ],
        ),
    ]
