# Generated by Django 5.0.6 on 2024-06-26 17:02

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_alter_order_options_orderproduct_color_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='address',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='Адрес доставки заказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='created_date',
            field=models.DateField(blank=True, null=True, verbose_name='Дата создания заказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_method',
            field=models.CharField(blank=True, choices=[('BT', 'Bank Transfer'), ('BC', 'By card'), ('BG', 'By billing'), ('CR', 'By cryptocurrency'), ('PP', 'By PayPal service')], max_length=50, null=True, verbose_name='Метод оплаты заказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, choices=[('CR', 'Created'), ('PR', 'Processed'), ('CD', 'Collected'), ('FD', 'Finished')], max_length=50, null=True, verbose_name='Статус закаказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='total_sum',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, validators=[django.core.validators.MinValueValidator(0, message='the total sum cannot be a negative number')], verbose_name='Общая сумма заказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Покупатель оформивший заказ'),
        ),
    ]
