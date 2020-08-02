from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


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
        fields = ('id', 'username')


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

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
