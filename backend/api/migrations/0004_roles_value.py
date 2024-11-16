from django.db import migrations

def create_roles(apps, schema_editor):
    Role = apps.get_model('api', 'Role')
    Role.objects.update_or_create(id=1, defaults={'role': 'user'})
    Role.objects.update_or_create(id=2, defaults={'role': 'admin'})

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_passphrase_passphrase'),
    ]

    operations = [
        migrations.RunPython(create_roles),
    ]