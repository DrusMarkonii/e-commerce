import React from "react";
import { Card, Image } from "react-bootstrap";
import starImg from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import "../styles/deviceItem.css";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="card"
      border={"dark-light"}
      onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}
    >
      <Image
        className="card_img"
        src={process.env.REACT_APP_API_URL + device.img}
      />
      <div className="mt-1 d-flex justify-content-between">{device.name}</div>
      <div className="d-flex">
        {device.rating}
        <Image src={starImg} width={35} />
      </div>
      <div>{device.price}$</div>
    </Card>
  );
};

export default DeviceItem;
