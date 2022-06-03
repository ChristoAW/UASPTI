import { useContext } from "react";
import { gameContext } from "../Game";

export default function ProgressBar() {
  const { stats } = useContext(gameContext);

  return (
    <div className="stats">
      <p>Money: Rp.{stats.money}</p>
      <div className="row"></div>
      <div className="row">
        <div className="col-6">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.hunger + "%" }}
            >
              Hunger
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.fun + "%" }}
            >
              Fun
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.energy + "%" }}
            >
              Energy
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.intel + "%" }}
            >
              Intelligence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
