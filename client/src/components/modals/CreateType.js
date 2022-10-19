import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createType } from "../../http/deviceApi";

export default function CreateType({ show, onHide }) {
  const [value, setValue] = useState("");
  const addType = () => {
    createType({ name: value })
      .then(() => onHide())
      .then(() => setValue(""));
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Enter name of type"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addType}>
          Add
        </Button>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
