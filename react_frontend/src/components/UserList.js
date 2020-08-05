import React, { Component } from "react";
import { Table } from "reactstrap";
import NewUserModal from "./NewUserModal";

class UserList extends Component {
  render() {
    const users = this.props.users;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!users || users.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.pk}>
                <td>{users.id}</td>
                <td>{users.usermae}</td>
                <td align="center">
                <NewUserModal
                  create={false}
                  user={user}
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

export default UserList;
