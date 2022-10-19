import React, { createContext } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext<any>(null);

const container: any = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      devices: new DeviceStore(),
    }}
  >
    <App />
  </Context.Provider>
);
