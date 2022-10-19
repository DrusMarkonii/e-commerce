import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchBrands, fetchTypes, createDevice } from "../../http/deviceApi";

const CreateDevice = observer(({ show, onHide }) => {
  const { devices } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchTypes().then((data) => devices.setTypes(data));
    fetchBrands().then((data) => devices.setBrands(data));
  }, []);

  const addNewInfo = () =>
    setInfo([...info, { title: "", description: "", number: Date.now() }]);

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("count", `${count}`);
    formData.append("brandId", devices.selectedBrand.id);
    formData.append("typeId", devices.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mt-2 mb-3">
          <Dropdown.Toggle>
            {devices.selectedType.name || "Choose type"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {devices.types.map((type) => (
              <Dropdown.Item
                onClick={() => devices.setSelectedType(type)}
                key={type.id}
              >
                {type.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle>
            {devices.selectedBrand.name || "Choose brand"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {devices.brands.map((brand) => (
              <Dropdown.Item
                onClick={() => devices.setSelectedBrand(brand)}
                key={brand.id}
              >
                {brand.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form>
          <Form.Control
            className="mt-2"
            placeholder="Enter name of device"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            type="number"
            className="mt-2"
            placeholder="Enter price of device"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Control type="file" className="mt-2" onChange={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addNewInfo}>
            Add new device
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  placeholder="Enter name property"
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Enter description property"
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => removeInfo(i.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
