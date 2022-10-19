import React, { useContext, useState } from "react";
import { Button, Image } from "react-bootstrap";
import starImg from "../../assets/star.png";
// import starImg from "../../assets/star.png";
import { useNavigate } from "react-router-dom";
import "./basketDeviceItem.scss";
import { DEVICE_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import { FaTrash } from "react-icons/fa";

export default function BasketDeviceItem({ device, totalPriceFromDevice }) {
  const navigate = useNavigate();
  const { devices } = useContext(Context);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(device.price * count);

  const increaseDevice = () => {
    setCount(() => count + 1);
    totalPriceFromDevice(totalPrice);
  };

  const decreaseDevice = () => {
    if (count > 1) {
      setCount(() => count - 1);
      totalPriceFromDevice(-device.price);
    }
  };

  const removeBasketDevice = () => {
    devices.removeBasketDevice(device);
    const localListDevices = JSON.parse(localStorage.getItem("devices"));
    const updatedListDevices = localListDevices.filter(
      (item) => item.id !== device.id
    );
    totalPriceFromDevice(-device.price * count);
    localStorage.setItem("devices", JSON.stringify(updatedListDevices));
  };

  return (
    <div className="basket_card" border={"dark-light"}>
      <div
        className="card_link"
        onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}
      >
        <Image
          className="card_img"
          src={process.env.REACT_APP_API_URL + device.img}
          width={50}
        />
        <div className="mt-1 d-flex justify-content-between">{device.name}</div>
        <div className="d-flex">
          {device.rating}
          <Image src={starImg} width={40} height={40} />
        </div>
      </div>
      <div className="counter_panel">
        <Button
          variant="danger"
          className="counter_panel_button"
          onClick={() => decreaseDevice(device)}
        >
          -
        </Button>
        <p className="counter_panel_number">{count}</p>
        <Button
          variant="success"
          className="counter_panel_button"
          onClick={increaseDevice}
        >
          +
        </Button>
        <Button
          className="counter_panel_number"
          variant="light"
          onClick={() => removeBasketDevice(device)}
        >
          <FaTrash />
        </Button>
      </div>
      <div>{device.price * count}$</div>
    </div>
  );
}
