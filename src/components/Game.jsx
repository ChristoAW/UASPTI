import { useState, useLayoutEffect, useEffect, useContext } from "react";
import ProgressBar from "./Progressbar";
import { basicInfo } from "../App";

export default function Game() {
  const [hunger, setHunger] = useState(50);
  const [fun, setFun] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [time, setTime] = useState(496800);
  const [timeKey, setTimeKey] = useState(1000);

  const { name, prodi, gender } = useContext(basicInfo);

  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (hunger > 0) setHunger(hunger - 1);
    if (happiness > 0) setHappiness(happiness - 1);
    if (energy > 0) setEnergy(energy - 1);
    if (fun > 0) setFun(fun - 1);
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
          <h1>Nama:{name}</h1>
          <p>Prodi:{prodi}</p>
          <p>Gender:{gender}</p>
          <p>DAY : {day[Math.floor((time / 86400) % 7)]}</p>
          <p>
            TIME :
            {Math.floor((time / 3600) % 24).toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            })}
            :
            {Math.floor((time / 60) % 60).toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            })}
            :
            {(time % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
          </p>
          <ProgressBar
            hunger={hunger}
            fun={fun}
            energy={energy}
            happiness={happiness}
          />
          <p>Hunger {hunger}</p>
          <p>Fun {fun}</p>
          <p>Energy {energy}</p>
          <p>Happiness {happiness}</p>
          <button onClick={() => setHunger(hunger + 10)}>Makan</button>
          <button onClick={() => setTimeKey(timeKey / 10)}>Time--</button>
          <button onClick={() => setTimeKey(timeKey * 10)}>Time++</button>
        </div>
      </div>
    </div>
  );
}
