import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

export default function Game() {
  const [hunger, setHunger] = useState(50);
  const [fun, setFun] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [jam, setJam] = useState(new Date().toLocaleTimeString());

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
    <div className="container-lg">
      <h1></h1>
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
  );
}

//test conflict

