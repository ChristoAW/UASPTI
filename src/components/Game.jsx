import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import Phone from "./Phone";
import Main from "./Main";
import GameOver from "./GameOver";

import listMakanan from "./data/listMakanan";

export const gameContext = createContext(null);

export default function Game() {
  const [stats, setStats] = useState({
    hunger: 50,
    fun: 50,
    energy: 50,
    happiness: 50,
  });
  const [time, setTime] = useState(0);
  const [timeKey, setTimeKey] = useState(500);
  const [isOnPhone, setIsOnPhone] = useState(false);
  const [inventory, setInventory] = useState(listMakanan);
  const [isGameOver, setIsGameOver] = useState(false);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);
  const [location, setLocation] = useState("Home");
  const [finalTime, setfinalTime] = useState(-1);

  const newsURL =
    "https://newsapi.org/v2/everything?qInTitle='indonesia'&apiKey=c149d7a9909944daa2fa28ec6b6e75e8";
  const weatherURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=-6.256135116177676&lon=106.61850408488958&appid=afd3918370eb1401ea7c94a5ed685d20";
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
    if (time >= 10080) {
      setIsGameOver(true);
      setTimeKey(10000000);
    }
    if (time == finalTime) {
      setTimeKey(500);
      setfinalTime(-1);
    }
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
    }, timeKey);
    return () => clearInterval(interval);
  }, [time, timeKey]);

  useEffect(() => {
    axios.get(newsURL).then((res) => setNews(res.data.articles));
    axios.get(weatherURL).then((res) => setWeather(res.data.daily));
  }, []);

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
              location,
              setLocation,
            }}
          >
            {isGameOver ? <GameOver /> : isOnPhone ? <Phone /> : <Main />}
          </gameContext.Provider>
          <hr />
          <h3>DEBUG</h3>
          <button onClick={() => setTimeKey(timeKey / 10)}>Time--</button>
          <button onClick={() => setTimeKey(timeKey * 10)}>Time++</button>
          <button onClick={() => setTimeKey(10000000)}>Stop</button>
          <button onClick={() => setIsOnPhone(!isOnPhone)}>Phone</button>
          <button onClick={() => console.log(news)}>News</button>
          <button onClick={() => console.log(weather)}>Weather</button>
          <button
            onClick={() => {
              setfinalTime(time + 480);
              setTimeKey(10);
            }}
          >
            Timelapse +8
          </button>
        </div>
      </div>
    </div>
  );
}
