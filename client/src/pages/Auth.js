import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { Button, Container, Form } from "react-bootstrap";

import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const enterInAcc = async () => {
    try {
      let data;
      if (isLogin) {
        const data = await login(email, password);
      } else {
        const data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Authorization"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            placeholder="Enter your email"
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            placeholder="Enter password"
            className="mt-3"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {" "}
            {isLogin ? (
              <div>
                Do you haven't account?
                <NavLink style={{ marginLeft: "10px" }} to={REGISTRATION_ROUTE}>
                  Go Registrstation!
                </NavLink>
              </div>
            ) : (
              <div>
                Do you have account?
                <NavLink style={{ marginLeft: "10px" }} to={LOGIN_ROUTE}>
                  Login
                </NavLink>
              </div>
            )}
            <Button
              variant={"outline-success"}
              className="mt-3 align-self-end"
              onClick={() => enterInAcc()}
            >
              Enter
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
