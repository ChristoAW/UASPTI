import { useState, useContext, createContext } from "react";

import Clock from "./modules/Clock";
import ProgressBar from "./modules/ProgressBar";
import PhoneMenu from "./modules/PhoneMenu";

export const phoneContext = createContext();

export default function Phone() {
  const [phoneMenu, setPhoneMenu] = useState("home");
  return (
    <div>
      <h1>Ini Phone</h1>
      <Clock option="phone" />
      <ProgressBar />
      <phoneContext.Provider value={{ phoneMenu, setPhoneMenu }}>
        <PhoneMenu />
      </phoneContext.Provider>
    </div>
  );
}
