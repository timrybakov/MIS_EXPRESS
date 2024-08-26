# Generated by Django 5.0.2 on 2024-08-16 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BankAccountNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=34, verbose_name='Номер банковского счета')),
            ],
            options={
                'verbose_name': 'Номер банковского счета',
                'verbose_name_plural': 'Номера банковских счетов',
            },
        ),
    ]
