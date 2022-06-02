import { useContext, useState } from "react";

import Clock from "./modules/Clock";
import ProgressBar from "./modules/ProgressBar";
import Menu from "./modules/Menu";

import { gameContext } from "./Game";
import listMenu from "./data/listMenu";

export default function Main() {
  const {
    location,
    setLocation,
    setIsOnPhone,
    time,
    setExpectedTime,
    setTimeKey,
  } = useContext(gameContext);
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [menu, setMenu] = useState(null);

  return (
    <div id="atHome">
      <h1>Ini Main</h1>
      <Clock option="main" />
      <ProgressBar />
      <p>@ {location}</p>
      <div className="locationButtonContainer">
        {listMenu
          .filter((list) => list.location !== location)
          .map((filteredList, index) => (
            <button
              key={index}
              onClick={() => {
                console.log(day[Math.floor((time / 1440) % 7)]);
                console.log(
                  Math.floor((time / 60) % 24).toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  })
                );
                console.log(filteredList.location);
                if (
                  (filteredList.location === "Kampus" &&
                    day[Math.floor((time / 1440) % 7)] === "Sunday") ||
                  (Math.floor((time / 60) % 24).toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  }) < "08" &&
                    Math.floor((time / 60) % 24).toLocaleString(undefined, {
                      minimumIntegerDigits: 2,
                    }) >= "18")
                ) {
                  alert("Kampus Belum Buka");
                } else {
                  setLocation(filteredList.location);
                  setExpectedTime(time + 15);
                  setTimeKey(10);
                }
              }}
            >
              {filteredList.location}
            </button>
          ))}
      </div>
      <div className="menuButtonContainter">
        {listMenu
          .find((list) => list.location === location)
          .renderMenus.map((menu, index) => (
            <button key={index} onClick={() => setMenu(menu)}>
              {menu}
            </button>
          ))}
      </div>
      <Menu menu={menu} />
      <button onClick={() => setIsOnPhone(true)}>Phone</button>
    </div>
  );
}
