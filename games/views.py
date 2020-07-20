from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import urllib.parse

from .models import Game
from .serializers import *

@api_view(['GET', 'POST'])
def games_list(request):
    if request.method == 'GET':
        data = Game.objects.raw('SELECT * FROM games_game')
        print(data)

        serializer = GameSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        print(request.data)
        
        serializer = GameSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO games_game (game_name, release_year, time_to_complete, genre) VALUES (%s, %s, %s, %s)", [request.data["game_name"], request.data["release_year"], request.data["time_to_complete"], request.data["genre"]])
        return Response(status=status.HTTP_201_CREATED)

@api_view(['PUT', 'DELETE'])
def game_details(request, enc_game_name):
    game_name = urllib.parse.unquote(enc_game_name)
    try:
        games = Game.objects.raw('SELECT * FROM games_game WHERE game_name = %s', [game_name])
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if (len(games) == 0):
        return Response(status = status.HTTP_404_NOT_FOUND)

    game = list(games)[0]

    print(len(games))
    print(game)

    if request.method == 'PUT':
        with connection.cursor() as cursor:
            resp = cursor.execute("UPDATE games_game SET release_year = %s, time_to_complete = %s, genre = %s WHERE game_name = %s ", [request.data["release_year"], request.data["time_to_complete"], request.data["genre"], game_name])
            print(resp)
            print(connection.queries)
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM games_game WHERE game_name = %s", [game_name])
        return Response(status=status.HTTP_204_NO_CONTENT)
