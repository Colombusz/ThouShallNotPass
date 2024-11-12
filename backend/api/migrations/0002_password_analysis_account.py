# Generated by Django 5.1.3 on 2024-11-12 21:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Password',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Analysis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entropy', models.FloatField(blank=True, null=True)),
                ('estimated_cracking_time', models.CharField(blank=True, max_length=100, null=True)),
                ('remarks', models.CharField(max_length=100)),
                ('password', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='analysis', to='api.password')),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accounts', to='api.user')),
                ('password', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='accounts', to='api.password')),
            ],
        ),
    ]
