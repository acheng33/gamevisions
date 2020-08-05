from django.db import models

# Create your models here.

class Game(models.Model):
    game_name = models.CharField(max_length = 255, primary_key = True)
    release_year = models.IntegerField()
    time_to_complete = models.IntegerField(null = True)
    genre = models.CharField(max_length = 50)

    def __str__(self):
        return self.game_name

class Platform(models.Model):
    class Meta:
        unique_together = (('game_name', 'platform_name'))

    game_name = models.ForeignKey('Game', on_delete = models.CASCADE)
    platform_name = models.CharField(max_length = 50)
    rating = models.FloatField()
    single_player = models.BooleanField()
    multiplayer = models.BooleanField()
    cooperative = models.BooleanField()
    mods = models.BooleanField()

    def __str__(self):
        return str(self.game_name) + " (" + self.platform_name + ")"

class User(models.Model):
    username = models.CharField(max_length = 50, primary_key = True)
    password = models.CharField(max_length = 150)

    def __str__(self):
        return self.username

class Preference(models.Model):
    class Meta:
        unique_together = (('username', 'preference_key', 'preference_value'))

    username = models.ForeignKey('User', on_delete = models.CASCADE)
    preference_key = models.CharField(max_length = 100)
    preference_value = models.CharField(max_length = 150)

    def __str__(self):
        return "[" + str(self.username) + "] " + self.preference_key + " : " + self.preference_value
