import { useState, useEffect, useContext, createContext } from "react";
import { basicInfo } from "../App";

import Phone from "./Phone";
import Main from "./Main";

import listMakanan from "./data/listMakanan";

export const gameContext = createContext(null);

export default function Game() {
  const { name, prodi, gender } = useContext(basicInfo);

  const [stats, setStats] = useState({
    hunger: 50,
    fun: 50,
    energy: 50,
    happiness: 50,
  });
  const [time, setTime] = useState(0);
  const [timeKey, setTimeKey] = useState(1000);
  const [isOnPhone, setIsOnPhone] = useState(false);
  const [inventory, setInventory] = useState(listMakanan);

  const timeOfTheDay = ["Morning", "Morning", "Afternoon", "Evening"];

  useEffect(() => {
    let hunger = stats.hunger;
    let happiness = stats.happiness;
    let fun = stats.fun;
    let energy = stats.energy;
    if (hunger > 0) hunger -= 1;
    if (happiness > 0) happiness -= 1;
    if (fun > 0) fun -= 1;
    if (energy > 0) energy -= 1;
    setStats({
      hunger,
      happiness,
      fun,
      energy,
    });
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
    }, timeKey);
    return () => clearInterval(interval);
  }, [time, timeKey]);

  return (
    <div className="timeOfTheDay">
      <div className="weather">
        <div className="location">
          <gameContext.Provider
            value={{
              stats,
              setStats,
              time,
              setTime,
              timeKey,
              setTimeKey,
              isOnPhone,
              setIsOnPhone,
              inventory,
              setInventory,
              timeOfTheDay,
            }}
          >
            {isOnPhone && <Phone />}
            <Main />
          </gameContext.Provider>
          <button
            onClick={(prevState) =>
              setStats({ ...stats, hunger: stats.hunger + 10 })
            }
          >
            Makan
          </button>
          <button onClick={() => setTimeKey(timeKey / 10)}>Time--</button>
          <button onClick={() => setTimeKey(timeKey * 10)}>Time++</button>
          <button onClick={() => setIsOnPhone(!isOnPhone)}>Phone</button>
        </div>
      </div>
    </div>
  );
}
