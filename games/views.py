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
    # Return all rows from a cursor as a dict
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

#/api/games
@api_view(['GET', 'POST'])
def games_list(request):
    if request.method == 'GET':
        print("getting all games in the database")
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT * 
                FROM games_game, games_platform 
                WHERE games_game.game_name = games_platform.game_name_id 
                ORDER BY game_name""")
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
        print("inserting new games into database")

        with connection.cursor() as cursor:
            cursor.execute("""SELECT * 
                            FROM games_game 
                            WHERE game_name = %s""", [request.data["game_name"]])

            data = dictfetchall(cursor)

            if len(data) == 0:
                cursor.execute("""INSERT INTO games_game (game_name, release_year, time_to_complete, genre) 
                            VALUES (%s, %s, %s, %s)""", [
                            request.data["game_name"], request.data["release_year"], request.data["time_to_complete"], request.data["genre"]])

                cursor.execute("""INSERT INTO games_platform (platform_name, rating, single_player, multiplayer, cooperative, mods, game_name_id) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s)""", [
                                request.data["platform_name"], request.data["rating"], request.data["single_player"], request.data[
                                "multiplayer"], request.data["cooperative"], request.data["mods"], request.data["game_name"]])
            else :
                cursor.execute("""INSERT INTO games_platform (platform_name, rating, single_player, multiplayer, cooperative, mods, game_name_id) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s)""", [
                            request.data["platform_name"], request.data["rating"], request.data["single_player"], request.data[
                            "multiplayer"], request.data["cooperative"], request.data["mods"], request.data["game_name"]])

        return Response(status=status.HTTP_201_CREATED)

#/api/games/:enc_game_name
@ api_view(['PUT'])
def game_details(request, enc_game_name):
    game_name = urllib.parse.unquote(enc_game_name)
    try:
        games = Game.objects.raw(
            """SELECT * 
            FROM games_game 
            WHERE game_name = %s""", [game_name])

    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if (len(games) == 0):
        return Response(status=status.HTTP_404_NOT_FOUND)

    game = list(games)[0]
    platform = request.data["platform_name"]

    pp.pprint(request.data)

    if request.method == 'PUT':
        print("updates games in the database or in the platform table")
        with connection.cursor() as cursor:
            resp = cursor.execute("""UPDATE games_game 
                                SET release_year = %s, time_to_complete = %s, genre = %s WHERE game_name = %s """, 
                                [request.data["release_year"], request.data["time_to_complete"], request.data["genre"], game_name])

            cursor.execute(
                """INSERT INTO games_platform (platform_name, rating, single_player, multiplayer, cooperative, mods, game_name_id) 
                VALUES (%s, %s, %s, %s, %s, %s, %s) 
                ON DUPLICATE KEY UPDATE platform_name = %s, rating = %s, single_player = %s, multiplayer = %s, cooperative = %s, mods = %s, game_name_id = %s""",

                [request.data["platform_name"], request.data["rating"], request.data["single_player"], request.data["multiplayer"], request.data["cooperative"], 
                request.data["mods"], game_name, request.data["platform_name"], request.data["rating"], request.data["single_player"], request.data["multiplayer"], 
                request.data["cooperative"], request.data["mods"], game_name])

        return Response(status=status.HTTP_204_NO_CONTENT)

#/api/:enc_username
@ api_view(['GET', 'POST'])
def user_preferences(request, enc_username):
    current_user = urllib.parse.unquote(enc_username)
    current_user = current_user.replace("/", "")

    if request.method == 'GET':
        print("getting the preferences of a given user")
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT * 
                FROM games_user, games_preference 
                WHERE games_user.username = games_preference.username_id AND games_user.username = %s 
                ORDER BY games_preference.preference_key, games_preference.preference_value""", [current_user])

            data = dictfetchall(cursor)

            user_preference_dictionary = {}

            for user in data:
                if user["username"] in user_preference_dictionary:
                    user_preference_dictionary[user["username"]]["preferences"].append(
                        dict((k, user[k]) for k in ("preference_value", "preference_key")))
                else:
                    user_preference_dictionary[user["username"]] = dict((k, user[k]) for k in (
                        "username", "password"))
                    user_preference_dictionary[user["username"]]["preferences"] = [(
                        dict((k, user[k]) for k in ("preference_value", "preference_key")))]

            preferences_data = []
            for key, value in user_preference_dictionary.items():
                preferences_data.append(value)

            serializer = UserPreferencesSerializer(
                preferences_data, context={'request': request}, many=True)

            pp.pprint(preferences_data)

            return Response(serializer.data)

    elif request.method == 'POST':
        print("inserting a new preference for a given user")
        print(current_user)

        serializer = PreferenceSerializer(data={"username_id": current_user, "preference_key": request.data["preference_key"], "preference_value": request.data["preference_value"]})
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            cursor.execute("""INSERT INTO games_preference (preference_value, username_id, preference_key) 
                            VALUES (%s, %s, %s)""", [
                           request.data["preference_value"], current_user, request.data["preference_key"]])

        return Response(status=status.HTTP_201_CREATED)


# /api/:enc_username/:enc_preference_key/:enc_preferece_value
@ api_view(['GET', 'DELETE'])
def delete_preference(request, enc_username, enc_preference_key, enc_preference_value):
    print("entered delete preference")

    current_user = urllib.parse.unquote(enc_username)
    current_preference_key = urllib.parse.unquote(enc_preference_key)
    current_preference_value = urllib.parse.unquote(enc_preference_value)

    current_preference_value = current_preference_value.replace("/", "")

    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT * 
                FROM games_user, games_preference 
                WHERE games_user.username = games_preference.username_id AND games_user.username = %s""", [current_user])

            data = dictfetchall(cursor)

            user_preference_dictionary = {}

            for user in data:
                if user["username"] in user_preference_dictionary:
                    user_preference_dictionary[user["username"]]["preferences"].append(
                        dict((k, user[k]) for k in ("preference_value", "preference_key")))
                else:
                    user_preference_dictionary[user["username"]] = dict((k, user[k]) for k in (
                        "username", "email", "pwd"))
                    user_preference_dictionary[user["username"]]["preferences"] = [(
                        dict((k, user[k]) for k in ("preference_value", "preference_key")))]

            preferences_data = []
            for key, value in user_preference_dictionary.items():
                preferences_data.append(value)

            serializer = UserPreferencesSerializer(
                preferences_data, context={'request': request}, many=True)

            pp.pprint(preferences_data)

            return Response(serializer.data)

    elif request.method == 'DELETE':
        print("entered")
        with connection.cursor() as cursor:
            cursor.execute("""DELETE FROM games_preference 
                            WHERE username_id = %s AND preference_value = %s AND preference_key = %s""", 
                            [current_user, current_preference_value, current_preference_key])

        return Response(status=status.HTTP_204_NO_CONTENT)

#api/usergames/:enc_username
@api_view(['GET'])
def percentage_matches(request, enc_username):
    current_user = urllib.parse.unquote(enc_username)

    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.callproc('givePercentage', [current_user])
            data = dictfetchall(cursor)

            game_with_percentages_dictionary = {}

            for game in data:
                if game["game_name"] in game_with_percentages_dictionary:
                    game_with_percentages_dictionary[game["game_name"]]["platforms"].append(
                        dict((k, game[k]) for k in ("platform_name", "rating", "single_player", "multiplayer", "cooperative", "mods", "percent_match")))
                else:
                    game_with_percentages_dictionary[game["game_name"]] = dict((k, game[k]) for k in (
                        "game_name", "release_year", "time_to_complete", "genre"))
                    game_with_percentages_dictionary[game["game_name"]]["platforms"] = [(
                        dict((k, game[k]) for k in ("platform_name", "rating", "single_player", "multiplayer", "cooperative", "mods", "percent_match")))]

            games_data = []
            for key, value in game_with_percentages_dictionary.items():
                games_data.append(value)

            pp.pprint(games_data)

            return Response(games_data)

#api/login
@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        print("retrieving a user's information")
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * 
                            FROM games_user WHERE username = %s AND password = %s""",
                            [request.data["username"], request.data["password"]])

            data = dictfetchall(cursor)

            pp.pprint(data)

            if len(data) > 0:
                serializer = UserSerializer(
                    data[0], context={'request': request})

                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        print("adding a new user into the database")
        with connection.cursor() as cursor:
            cursor.execute("""INSERT INTO games_user(username, password) 
                            VALUES(%s, %s)""", 
                            [request.data["username"], request.data["password"]])

        return Response(status=status.HTTP_201_CREATED)
