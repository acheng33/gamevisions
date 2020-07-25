from rest_framework import serializers
from .models import *


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('game_name', 'release_year', 'time_to_complete', 'genre')


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('game_name_id', 'platform_name', 'rating',
                  'single_player', 'multiplayer', 'cooperative', 'mods')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'pwd')


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = ('username_id', 'preference_key', 'preference_value')


class GameDetailsSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ('game_name', 'release_year',
                  'time_to_complete', 'genre', 'platforms')


class UserPreferencesSerializer(serializers.ModelSerializer):
    preferences = PreferenceSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username','preferences')
