from rest_framework import serializers
from .models import Game
from .models import Platform


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('game_name', 'release_year', 'time_to_complete', 'genre')


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('game_name_id', 'platform_name', 'rating',
                  'single_player', 'multiplayer', 'cooperative', 'mods')


class GameDetailsSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ('game_name', 'release_year',
                  'time_to_complete', 'genre', 'platforms')
