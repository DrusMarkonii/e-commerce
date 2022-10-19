import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";

import AppRouter from "./components/AppRouter";
import { Context } from ".";
import NavBar from "./components/NavBar";
import { check } from "./http/userApi";
import { deviceType } from "./utils/types";

const App = observer(() => {
  const { user, devices } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const localDevices: deviceType = JSON.parse(localStorage.getItem("devices")!);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then(() => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 1000);

    if (localDevices.length) {
      localDevices.map((device) => devices.setBasketDevices(device));
    }
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
