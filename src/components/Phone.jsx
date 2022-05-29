import Clock from "./modules/Clock";
import ProgressBar from "./modules/ProgressBar";

export default function Phone() {
  return (
    <div>
      <h1>Ini Phone</h1>
      <Clock option="phone" />
      <ProgressBar />
    </div>
  );
}
