import { useContext, useState } from "react";

import Clock from "./modules/Clock";
import ProgressBar from "./modules/ProgressBar";
import Menu from "./modules/Menu";

import { gameContext } from "./Game";
import listMenu from "./data/listMenu";

export default function Main() {
  const { location, setLocation } = useContext(gameContext);
  const [menu, setMenu] = useState(null);

  return (
    <div id="atHome">
      <h1>Ini Main</h1>
      <Clock option="main" />
      <ProgressBar />
      <p>@ {location}</p>
      <div className="locationButtonContainer">
        {listMenu
          .filter((list) => list.location != location)
          .map((filteredList, index) => (
            <button
              key={index}
              onClick={() => setLocation(filteredList.location)}
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
    </div>
  );
}
