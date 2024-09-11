# Generated by Django 5.0.2 on 2024-08-30 11:45

import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('providers', '0004_alter_bankaccountnumber_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='Уникальный идентификатор кошелька')),
                ('balance', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Баланс')),
                ('upcoming_balance', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Ожидаемый баланс')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='providers.provider', verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Кошелёк',
                'verbose_name_plural': 'Кошельки',
            },
        ),
    ]
