import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewGameForm from "./NewGameForm";

class NewGameModal extends Component {
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

    var title = "Editing Game";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    var buttonProfile;
    if (create) {
      title = "Creating New Game";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );

      buttonProfile = (
        <Link to="/profile">
          <Button color="primary"
          className="float-left"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}>Profile</Button>
          </Link>
        );
    }

    return (
      <Fragment>
        {button}
        {buttonProfile}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewGameForm
              create={create}
              resetState={this.props.resetState}
              toggle={this.toggle}
              game={this.props.game}
              platform={this.props.platform}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewGameModal;
