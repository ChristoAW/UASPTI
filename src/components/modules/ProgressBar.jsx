import { useContext } from "react";
import { gameContext } from "../Game";

export default function ProgressBar() {
  const { stats } = useContext(gameContext);

  return (
    <div className="stats">
      <p>Hunger</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: stats.hunger + "%" }}
        ></div>
      </div>
      <p>Fun</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: stats.fun + "%" }}
        ></div>
      </div>
      <p>Energy</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: stats.energy + "%" }}
        ></div>
      </div>
      <p>Happiness</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: stats.happiness + "%" }}
        ></div>
      </div>
    </div>
  );
}
