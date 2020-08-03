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
            <th>Preference Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!preferences || !preferences.preferences || preferences.preferences.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            preferences.preferences.map(preference => (
              <tr key={preference.pk}>
                <td>{preferences.username}</td>
                <td>{preference.preference_key}</td>
                <td>{preference.preference_value}</td>
                <td align="center">
                  <RemovePreference
                    preference_key={preference.preference_key}
                    preference_value={preference.preference_value}
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
