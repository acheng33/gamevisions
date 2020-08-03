import React, { Component } from "react";
import { Table } from "reactstrap";
import NewPreferenceModal from "./NewPreferenceModal";
import RemovePreference from "./RemovePreference";

class PreferenceList extends Component {
  render() {
    const preferences = this.props.preferences;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Username</th>
            <th>Preference Key</th>
            <th>Preference Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!preferences|| preferences.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            preferences.map(preferences => (
              <tr key={preferences.pk}>
                <td>{preferences.username_id}</td>
                <td>{preferences.preference_key}</td>
                <td>{preferences.preferences_value}</td>
                <td align="center">
                  <NewPreferenceModal
                    create={false}
                    preferences={preferences}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <RemovePreference
                    pk={preferences.pk}
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

export default PreferenceList;
