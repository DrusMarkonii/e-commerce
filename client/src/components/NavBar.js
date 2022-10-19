import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import basket from "../assets/basket.png";

import { Context } from "..";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import ShoppingCart from "./ShoppingCart";

const NavBar = observer(() => {
  const { user, devices } = useContext(Context);
  const navigate = useNavigate();
  
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.clear();
    navigate(LOGIN_ROUTE);
  };
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          BuyDevice
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin
            </Button>
            {!devices.basketDevices.length ? (
              <Button
                variant={"outline-light"}
                onClick={() => navigate(BASKET_ROUTE)}
                style={{ marginLeft: "15px" }}
              >
                <Image src={basket} width={30} alt="basket" />
              </Button>
            ) : (
              <ShoppingCart count={devices.basketDevices.length} />
            )}

            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              style={{ marginLeft: "15px" }}
            >
              Log Out
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
