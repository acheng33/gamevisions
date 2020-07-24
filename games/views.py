import pprint
from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import urllib.parse

from .models import Game
from .serializers import *

pp = pprint.PrettyPrinter(indent=4)

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]


@api_view(['GET', 'POST'])  # /api/games
def games_list(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute(
                'SELECT * FROM games_game, games_platform WHERE games_game.game_name = games_platform.game_name_id ')
            data = dictfetchall(cursor)

            game_platform_dictionary = {}

            for game in data:
                if game["game_name"] in game_platform_dictionary:
                    game_platform_dictionary[game["game_name"]]["platforms"].append(
                        dict((k, game[k]) for k in ("platform_name", "rating", "single_player", "multiplayer", "cooperative", "mods")))
                else:
                    game_platform_dictionary[game["game_name"]] = dict((k, game[k]) for k in (
                        "game_name", "release_year", "time_to_complete", "genre"))
                    game_platform_dictionary[game["game_name"]]["platforms"] = [(
                        dict((k, game[k]) for k in ("platform_name", "rating", "single_player", "multiplayer", "cooperative", "mods")))]

            games_data = []
            for key, value in game_platform_dictionary.items():
                games_data.append(value)

            pp.pprint(games_data)

            serializer = GameDetailsSerializer(
                games_data, context={'request': request}, many=True)

            return Response(serializer.data)

    elif request.method == 'POST':
        print(request.data)

        serializer = GameSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO games_game (game_name, release_year, time_to_complete, genre) VALUES (%s, %s, %s, %s)", [
                           request.data["game_name"], request.data["release_year"], request.data["time_to_complete"], request.data["genre"]])
        return Response(status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])  # /api/games/:enc_game_name
def game_details(request, enc_game_name):
    game_name = urllib.parse.unquote(enc_game_name)
    try:
        games = Game.objects.raw(
            'SELECT * FROM games_game WHERE game_name = %s', [game_name])
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if (len(games) == 0):
        return Response(status=status.HTTP_404_NOT_FOUND)

    game = list(games)[0]

    print(len(games))
    print(game)

    if request.method == 'PUT':
        with connection.cursor() as cursor:
            resp = cursor.execute("UPDATE games_game SET release_year = %s, time_to_complete = %s, genre = %s WHERE game_name = %s ", [
                                  request.data["release_year"], request.data["time_to_complete"], request.data["genre"], game_name])
            print(resp)
            print(connection.queries)
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute(
                "DELETE FROM games_game WHERE game_name = %s", [game_name])
        return Response(status=status.HTTP_204_NO_CONTENT)
