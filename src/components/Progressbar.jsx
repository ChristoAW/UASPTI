export default function ProgressBar({ hunger, fun, energy, happiness }) {
  return (
    <div className="stats">
      <p>Hunger</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: hunger + "%" }}
        ></div>
      </div>
      <p>Fun</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: fun + "%" }}
        ></div>
      </div>
      <p>Energy</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: energy + "%" }}
        ></div>
      </div>
      <p>Happiness</p>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: happiness + "%" }}
        ></div>
      </div>
    </div>
  );
}
