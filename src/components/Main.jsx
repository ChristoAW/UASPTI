import { useContext, useState, useEffect, createContext } from "react";

import Clock from "./modules/Clock";
import ProgressBar from "./modules/ProgressBar";
import Menu from "./modules/Menu";
import GambarPhone from "../assets/hp.png";

import { gameContext } from "./Game";
import { basicInfo } from "../App";
import listMenu from "./data/listMenu";
import listAvatar from "./data/listAvatar";

export const avatarContext = createContext(null);

export default function Main() {
  const {
    location,
    setLocation,
    setIsOnPhone,
    time,
    expectedTime,
    setExpectedTime,
    setTimeKey,
    timeOfTheDay,
  } = useContext(gameContext);
  const { gender } = useContext(basicInfo);
  const [avatar, setAvatar] = useState(gender);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (time === expectedTime) setAvatar(gender);
  }, [time]);

  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="container">
      <div className="mainStats">
        <Clock option="main" />
        <ProgressBar />
      </div>
      <div className="row">
        <div className="col-3" onClick={() => setIsOnPhone(true)}>
          <img src={GambarPhone} alt="phone" style={{ width: "100%" }} />
        </div>
        <div
          className="col-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <p>Good {timeOfTheDay[Math.floor((time / 360) % 4)]}</p>
          <img
            src={listAvatar[avatar]}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="col-3">
          <div className="locationButtonContainer row">
            {listMenu
              .filter((list) => list.location !== location)
              .map((filteredList, index) => (
                <button
                  className="col-12"
                  key={index}
                  onClick={() => {
                    if (
                      filteredList.location === "Kampus" &&
                      (Math.floor((time / 1440) % 7) === 0 ||
                      Math.floor((time / 60) % 24) < 8 ||
                      Math.floor((time / 60) % 24) >= 18)
                    ) {
                      alert("Kampus Belum Buka");
                    } else {
                      setLocation(filteredList.location);
                      setExpectedTime(time + 15);
                      setTimeKey(10);
                      setAvatar(gender + 10);
                    }
                  }}
                  style={{
                    borderRadius: "2px",
                    border: "none",
                    margin: "2px 0",
                  }}
                >
                  {filteredList.location}
                </button>
              ))}
          </div>
          <div className="menuButtonContainter row">
            <p style={{ marginBottom: "3px" }}>@ {location}</p>
            {listMenu
              .find((list) => list.location === location)
              .renderMenus.map((menu, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMenu(menu);
                  }}
                  style={{
                    borderRadius: "2px",
                    border: "none",
                    margin: "2px 0",
                  }}
                >
                  {menu}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "5px",
          height: menu && "300px",
          padding: menu && "20px",
        }}
      >
        {menu && (
          <button
            onClick={() => setMenu(null)}
            style={{
              borderRadius: "100%",
              border: "none",
              width: "30px",
              height: "30px",
            }}
          >
            X
          </button>
        )}
        <avatarContext.Provider value={{ avatar, setAvatar }}>
          <Menu menu={menu} />
        </avatarContext.Provider>
      </div>
    </div>
  );
}
