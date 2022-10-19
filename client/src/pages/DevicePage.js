import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Col, Container, Image, Row, Card, Button } from "react-bootstrap";
import star from "../assets/star.png";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";
import { Context } from "..";

export default function DevicePage() {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  const { devices } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  useEffect(() => {
    const addedDevices = devices?.basketDevices.filter(
      (item) => item.id === device.id
    );
    addedDevices[0]?.id && setIsChecked(true);
  }, [device]);


  const addToBasket = () => {
    devices.setBasketDevices(device);
    localStorage.setItem("devices", JSON.stringify(devices.basketDevices));
    setIsChecked(true);
  };

  return (
    <Container className="mt-3 d-flex flex-column">
      <Row>
        <Col md={4}>
          <Image src={process.env.REACT_APP_API_URL + device.img} width={300} />
        </Col>
        <Col md={4}>
          <Row className="d-flex">
            <h2>{device.name}</h2>
            <div>
              {device.rating} <Image width={50} src={star} />
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 28,
              border: "5px solid lightgray",
              borderRadius: 10,
            }}
          >
            <h3>Total: {device.price}$</h3>
            {isChecked ? (
              <Button
                variant={"outline-warning"}
                onClick={() => navigate("/basket")}
              >
                Go to the basket
              </Button>
            ) : (
              <Button variant={"outline-success"} onClick={addToBasket}>
                Add to the basket
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h3>Characteristics</h3>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            className="p-2"
            style={{ background: index % 2 === 0 ? "lightgrey" : "none" }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
}
