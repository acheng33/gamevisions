import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants/index2";

class RemovePreference extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deletePreference = (preference_key, preference_value) => {
    axios.delete("http://localhost:8000/api/preferences/" + "pengwing/" + preference_key + "/" + preference_value).then(() => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really wanna delete the preference?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deletePreference(this.props.preference_key, this.props.preference_value)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default RemovePreference;
