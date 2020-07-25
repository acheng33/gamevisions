import React, { Component } from "react";
import { Table } from "reactstrap";
import NewGameModal from "./NewGameModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class GameList extends Component {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!games|| games.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            games.map(games => (
              <tr key={games.pk}>
                <td>{games.game_name}</td>
                <td>{games.release_year}</td>
                <td>{games.time_to_complete}</td>
                <td>{games.genre}</td>
                <td align="center">
                  <NewGameModal
                    create={false}
                    games={games}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={games.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default GameList;
