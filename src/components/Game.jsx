import { useState, useEffect, useContext } from "react";
import ProgressBar from "./ProgressBar";
import { basicInfo } from "../App";

export default function Game() {
  const [hunger, setHunger] = useState(50);
  const [fun, setFun] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [happiness, setHappiness] = useState(50);

  const { name, prodi, gender } = useContext(basicInfo);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hunger > 0) setHunger(hunger - 1);
      if (happiness > 0) setHappiness(happiness - 1);
      if (energy > 0) setEnergy(energy - 1);
      if (fun > 0) setFun(fun - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [hunger, happiness, energy, fun]);
  return (
    <div className="timeOfTheDay">
      <div className="weather">
        <div className="location">
          <h1>{name}</h1>
          <p>{prodi}</p>
          <p>{gender}</p>
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
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

//test conflict

>>>>>>> 08509f8c0dd6dc953a21f81b4096f1dbf573bede
