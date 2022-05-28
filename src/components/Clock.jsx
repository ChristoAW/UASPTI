import { useContext } from "react";
import { gameContext } from "./Game";
import { basicInfo } from "../App";

export default function Clock({ option }) {
  const { time } = useContext(gameContext);
  const { name } = useContext(basicInfo);

  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (option === "main") {
    const { prodi } = useContext(basicInfo);
    return (
      <div className="clock">
        <p id="time">
          {day[Math.floor((time / 240) % 7)]} -
          {Math.floor((time / 60) % 24).toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          })}
          :
          {Math.floor(time % 60).toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          })}
        </p>
        <p>
          {name} - {prodi}
        </p>
      </div>
    );
  } else if (option === "phone") {
    const { timeOfTheDay } = useContext(gameContext);
    return (
      <div className="clock">
        <p id="time">
          {day[Math.floor((time / 240) % 7)]} -{" "}
          {Math.floor((time / 60) % 24).toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          })}
          :
          {Math.floor(time % 60).toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          })}
        </p>
        <p>
          Good {timeOfTheDay[Math.floor((time / 360) % 4)]} {name}
        </p>
      </div>
    );
  }
}
