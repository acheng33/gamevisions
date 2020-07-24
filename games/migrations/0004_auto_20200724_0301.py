# Generated by Django 3.0.8 on 2020-07-24 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_game_platform_preference_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='preference',
            old_name='preference',
            new_name='preference_value',
        ),
        migrations.AddField(
            model_name='preference',
            name='preference_key',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='preference',
            unique_together={('username', 'preference_key', 'preference_value')},
        ),
    ]
