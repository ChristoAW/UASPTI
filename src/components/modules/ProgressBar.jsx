import { useContext } from "react";
import { gameContext } from "../Game";

export default function ProgressBar() {
  const { stats } = useContext(gameContext);

  return (
    <div className="stats">
      <div className="row">
        <div className="col-6">
          <p>Hunger</p>{" "}
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.hunger + "%" }}
            ></div>
          </div>
        </div>
        <div className="col-6">
          <p>Fun</p>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.fun + "%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
        <p>Energy</p>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.energy + "%" }}
              ></div>
            </div>
        </div>

        <div className="col-6">
        <p>Intelligence</p>
            <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: stats.intel + "%" }}
            ></div>
          </div>
        </div>
      </div>
      <p>Money: Rp.{stats.money}</p>
    </div>
  );
}
