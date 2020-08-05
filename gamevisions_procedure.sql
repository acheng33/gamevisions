DELIMITER $$
CREATE PROCEDURE givePercentage(IN username VARCHAR(50))
game_loop: BEGIN
    DECLARE complete INT DEFAULT 0;
    DECLARE current_game_cur VARCHAR (255);
    DECLARE current_percentage_match INT DEFAULT 0;
    DECLARE number_genres INT DEFAULT 0;
    DECLARE number_playstyle INT DEFAULT 0;
    DECLARE genre_weight INT DEFAULT 35;
    DECLARE playstyle_weight INT DEFAULT 35;
    DECLARE rating_weight INT DEFAULT 10;

    DECLARE game_cursor CURSOR FOR SELECT DISTINCT game_name FROM games_game;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET complete = 1;

    DROP TABLE IF EXISTS percentage_table;

    CREATE TABLE percentage_table
    (
        game_name VARCHAR(255),
        platform_name VARCHAR(50),
        percent_match INTEGER,
        PRIMARY KEY(game_name, platform_name)
    );

    OPEN game_cursor;
    games: REPEAT
        FETCH game_cursor INTO current_game_cur;
        SET number_genres = (SELECT COUNT(*) FROM games_preference WHERE preference_key = "genre");
        SET number_playstyle  = (SELECT COUNT(*) FROM games_preference WHERE preference_key = "playstyle");

        platform_loop: BEGIN
        DECLARE complete2 INT DEFAULT 0;
        DECLARE current_platform_cur VARCHAR (50);
        DECLARE matching_preferences INT DEFAULT 0;

        DECLARE platform_cursor CURSOR FOR SELECT DISTINCT platform_name FROM games_platform WHERE game_name_id = current_game_cur;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET complete2 = 1;

        OPEN platform_cursor;
        platforms: REPEAT

            FETCH platform_cursor INTO current_platform_cur;

            SET current_percentage_match = 0;

            IF (current_platform_cur IN (SELECT DISTINCT preference_value FROM games_preference WHERE preference_key = "platform" AND username_id = username)) THEN SET current_percentage_match = 20;
            END IF;

            IF (number_genres > number_playstyle) THEN 
                SET playstyle_weight = 45;
                SET genre_weight = 15;
                SET rating_weight = 20;
            END IF;

            IF (number_genres > 0) THEN
                IF (SELECT genre FROM games_game WHERE game_name = current_game_cur AND genre IN (SELECT DISTINCT preference_value FROM games_preference WHERE preference_key = "genre" AND username_id = username)) THEN
                    SET current_percentage_match = current_percentage_match + genre_weight;
                END IF;
            END IF;

            IF (SELECT single_player FROM games_platform WHERE game_name_id = current_game_cur AND platform_name = current_platform_cur) = 1 THEN
                IF ((SELECT preference_value FROM games_preference WHERE username_id = username AND preference_key = "playstyle" AND preference_value = "singleplayer") = "singleplayer")
                    THEN SET matching_preferences = matching_preferences + 1;
                END IF;
            END IF;

            IF (SELECT multiplayer FROM games_platform WHERE game_name_id = current_game_cur AND platform_name = current_platform_cur) = 1 THEN
                IF ((SELECT preference_value FROM games_preference WHERE username_id = username AND preference_key = "playstyle" AND preference_value = "multiplayer") = "multiplayer")
                    THEN SET matching_preferences = matching_preferences + 1;
                END IF;
            END IF;

            IF (SELECT cooperative FROM games_platform WHERE game_name_id = current_game_cur AND platform_name = current_platform_cur) = 1 THEN
                IF ((SELECT preference_value FROM games_preference WHERE username_id = username AND preference_key = "playstyle" AND preference_value = "cooperative") = "cooperative")
                    THEN SET matching_preferences = matching_preferences + 1;
                END IF;
            END IF;

            IF (SELECT mods FROM games_platform WHERE game_name_id = current_game_cur AND platform_name = current_platform_cur) = 1 THEN
                IF ((SELECT preference_value FROM games_preference WHERE username_id = username AND preference_key = "playstyle" AND preference_value = "mods") = "mods")
                    THEN SET matching_preferences = matching_preferences + 1;
                END IF;
            END IF;

            IF (SELECT rating FROM games_platform WHERE game_name_id = current_game_cur AND platform_name = current_platform_cur) >= (SELECT preference_value FROM games_preference WHERE username_id = username AND preference_key = "rating") 
                THEN SET current_percentage_match = current_percentage_match + rating_weight;
            END IF;

            IF (number_playstyle > 0) THEN
                SET current_percentage_match = current_percentage_match + ((matching_preferences / number_playstyle) * playstyle_weight);
            END IF;

            INSERT IGNORE INTO percentage_table VALUES(current_game_cur, current_platform_cur, current_percentage_match);

        UNTIL complete2 END REPEAT platforms;
        CLOSE platform_cursor;
        END platform_loop;

    UNTIL complete END REPEAT games;
    CLOSE game_cursor;

    SELECT games_game.*, games_platform.platform_name, games_platform.rating, games_platform.single_player, games_platform.multiplayer, games_platform.cooperative, games_platform.mods, percentage_table.percent_match 
    FROM percentage_table, games_game, games_platform
    WHERE percentage_table.game_name = games_game.game_name AND percentage_table.game_name = games_platform.game_name_id AND percentage_table.platform_name = games_platform.platform_name AND percent_match > 0;

END game_loop $$
DELIMITER ;