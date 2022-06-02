import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import Phone from "./Phone";
import Main from "./Main";
import GameOver from "./GameOver";

import listMakanan from "./data/listMakanan";
import listBelajar from "./data/listBelajar";

export const gameContext = createContext(null);

export default function Game() {
  const [stats, setStats] = useState({
    money: 10000,
    hunger: 50,
    fun: 50,
    energy: 50,
    intel: 0,
  });
  const [time, setTime] = useState(0);
  const [timeKey, setTimeKey] = useState(500);
  const [expectedTime, setExpectedTime] = useState(-1);
  const [isOnPhone, setIsOnPhone] = useState(false);
  const [inventory, setInventory] = useState(listMakanan);
  const [isGameOver, setIsGameOver] = useState(false);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);
  const [location, setLocation] = useState("Home");
  const [statsAdder, setStatsAdder] = useState({
    hunger: 0,
    fun: 0,
    energy: 0,
    intel: 0,
  });

  const newsURL =
    "https://newsapi.org/v2/everything?qInTitle='indonesia'&apiKey=c149d7a9909944daa2fa28ec6b6e75e8";
  const weatherURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=-6.256135116177676&lon=106.61850408488958&appid=afd3918370eb1401ea7c94a5ed685d20";
  const timeOfTheDay = ["Morning", "Morning", "Afternoon", "Evening"];

  useEffect(() => {
    let hunger = stats.hunger + statsAdder.hunger;
    let fun = stats.fun + statsAdder.fun;
    let energy = stats.energy + statsAdder.energy;
    let intel = statsAdder.intel;
    if (hunger > 100) hunger = 100;
    if (fun > 100) fun = 100;
    if (energy > 100) energy = 100;
    if (hunger > 0) hunger -= 1;
    if (fun > 0) fun -= 1;
    if (energy > 0) energy -= 1;
    if (statsAdder.intel != 0) {
      setStats({
        hunger,
        fun,
        energy,
        intel,
      });
    } else {
      setStats({ ...stats, hunger, fun, energy });
    }
    if (time >= 10080 || hunger <= 0) {
      setIsGameOver(true);
      setTimeKey(10000000);
    }
    if (time === expectedTime) {
      setStatsAdder({
        hunger: 0,
        fun: 0,
        energy: 0,
        intel: 0,
      });
      setExpectedTime(-1);
      setTimeKey(500);
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
    setStats({ ...stats, money: stats.money + 5000 });
  }, [time > 0 && time % 1440 === 0]);

  return (
    <div
      className="timeOfTheDay"
      style={{ backgroundPositionX: "-" + time * 10 + "px" }}
    >
      <div className="weather">
        <p>
          Weather{" "}
          {weather && weather[Math.floor(time / 1440) % 7].weather[0].main}
        </p>
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
              statsAdder,
              setStatsAdder,
              expectedTime,
              setExpectedTime,
              news,
            }}
          >
            {isGameOver ? <GameOver /> : isOnPhone ? <Phone /> : <Main />}
          </gameContext.Provider>
          <hr />
          <h3>DEBUG</h3>
          <h1>MONEY: Rp.{stats.money}</h1>
          <p>
            Hunger: {stats.hunger} intel: {stats.intel} Fun: {stats.fun} Energy:{" "}
            {stats.energy}
          </p>
          <button onClick={() => setTimeKey(timeKey / 10)}>Time--</button>
          <button onClick={() => setTimeKey(timeKey * 10)}>Time++</button>
          <button onClick={() => setTimeKey(10000000)}>Stop</button>
          <button onClick={() => setIsOnPhone(!isOnPhone)}>Phone</button>
          <button onClick={() => console.log(news)}>News</button>
          <button onClick={() => console.log(weather)}>Weather</button>
        </div>
      </div>
    </div>
  );
}
