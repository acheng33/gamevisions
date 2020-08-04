import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewPreferenceForm from "./NewPreferenceForm";

class NewPreferenceModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Preference";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    var buttonFind;
    if (create) {
      title = "Creating New Preference";

      button = (
        <Button
          color="primary"
          className="float-left"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );

      buttonFind = (
        <Link to="/recommend">
          <Button color="primary"
            className="float-right"
            onClick={this.toggle}
            style={{ minWidth: "200px" }}>Find Games</Button>
        </Link>
      );
    }

    return (
      <Fragment>
        {button}
        {buttonFind}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewPreferenceForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              preference={this.props.preference}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewPreferenceModal;
