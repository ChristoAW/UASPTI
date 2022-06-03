import { useState, useContext, createContext } from "react";

import Clock from "./modules/Clock";
import ProgressBar from "./modules/ProgressBar";
import PhoneMenu from "./modules/PhoneMenu";
import GambarPhone from "../assets/hp.png";
import { gameContext } from "./Game";

export const phoneContext = createContext();

export default function Phone() {
  const [phoneMenu, setPhoneMenu] = useState("home");
  const { setIsOnPhone } = useContext(gameContext);
  return (
    <div
      className="phone"
      style={{
        background: "url(" + GambarPhone + ") no-repeat center center",
        backgroundSize: "auto 100%",
        height: "750px",
        color: "black",
      }}
    >
      <div
        className="phone-screen text-center"
        style={{ margin: "auto", maxWidth: "375px", padding: "75px 0" }}
      >
        <div
          className="phone-stats"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: "5px",
            color: "black",
            padding: "6px",
            marginBottom: "20px",
          }}
        >
          <Clock option="phone" />
          <ProgressBar />
        </div>
        <phoneContext.Provider value={{ phoneMenu, setPhoneMenu }}>
          <PhoneMenu />
          <button
            onClick={() =>
              phoneMenu === "home" ? setIsOnPhone(false) : setPhoneMenu("home")
            }
            style={{
              borderRadius: "100%",
              border: "none",
              height: "46px",
              width: "46px",
              position: "absolute",
              margin: "auto",
              left: 0,
              right: 0,
              top: "735px",
              backgroundColor: "transparent",
            }}
          ></button>
        </phoneContext.Provider>
      </div>
    </div>
  );
}
