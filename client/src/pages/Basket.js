import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "..";
import BasketDeviceItem from "../components/basketDeviceItem/BasketDeviceItem";

const Basket = observer(() => {
  const { devices } = useContext(Context);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (devices.basketDevices.length) {
      const prices = devices.basketDevices.map((device) => device.price);
      setTotal(prices.reduce((a, b) => a + b));
    }
  }, []);

  const totalPriceFromDevice = (price) => {
    setTotal(total + price);
  };

  return (
    <>
      <h2>Shopping cart</h2>
      {devices.basketDevices.length ? (
        <div>
          <div>
            <b>Total: {total} $</b>
          </div>
          {devices.basketDevices.map((device) => (
            <BasketDeviceItem
              key={device.id}
              device={device}
              totalPriceFromDevice={totalPriceFromDevice}
            />
          ))}
        </div>
      ) : (
        <h2>--Basket empty--</h2>
      )}
    </>
  );
});

export default Basket;
