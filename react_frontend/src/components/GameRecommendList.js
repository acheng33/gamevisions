import React, { Component } from "react";
import { Table } from "reactstrap";

class GameRecommendList extends Component {
  render() {
    const games = this.props.games;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Release Year</th>
            <th>Complete Time</th>
            <th>Genre</th>
            <th>Platform</th>
            <th>Rating</th>
            <th>Single Player</th>
            <th>Multiplayer</th>
            <th>Cooperative</th>
            <th>Mods</th>
            <th>Percent Match</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!games || games.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
              [].concat(...games.map(game => (
                game.platforms.map(platform => (
                  <tr key={`${game.game_name}:${platform.platform_name}`}>
                    <td>{game.game_name}</td>
                    <td>{game.release_year}</td>
                    <td>{game.time_to_complete}</td>
                    <td>{game.genre}</td>
                    <td>{platform.platform_name}</td>
                    <td>{platform.rating}</td>
                    <td>{platform.single_player ? "✅" : "❌"}</td>
                    <td>{platform.multiplayer ? "✅" : "❌"}</td>
                    <td>{platform.cooperative ? "✅" : "❌"}</td>
                    <td>{platform.mods ? "✅" : "❌"}</td>
                    <td>{platform.percent_match}</td>
                    <td align="center">
                    </td>
                  </tr>
                ))
              )))
            )}
        </tbody>
      </Table>
    );
  }
}

export default GameRecommendList;
