import React from "react";
import { Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASKET_ROUTE } from "../utils/consts";
import basket from "../assets/basket.png";

export default function ShoppingCart({ count = 1 }) {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant={"outline-light"}
        onClick={() => navigate(BASKET_ROUTE)}
        style={{ marginLeft: "15px" }}
      >
        <Image
          src={basket}
          width={30}
          alt="basket"
          style={{ position: "relative" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "25px",
            right: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            fontSize: "12px",
          }}
        >
          {count}
        </div>
      </Button>
    </div>
  );
}
