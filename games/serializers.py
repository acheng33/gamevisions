from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game 
        fields = ('game_name', 'release_year', 'time_to_complete', 'genre')