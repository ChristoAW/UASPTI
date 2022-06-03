import { useContext } from "react";

import { gameContext } from "./Game";

export default function GameOver() {
  const { stats, time } = useContext(gameContext);
  if (time >= 10800 && stats.intel === 0) {
    return [
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/_hQm74PbME4?&autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>,
      <h1>Kamu kurang belajar, Ayo Semangat Belajar !</h1>,
    ];
  } else if (time >= 10800 && stats.hunger <= 25) {
    return [
      <iframe
        width="853"
        height="480"
        src="https://www.youtube.com/embed/MS8OawQegYE?&autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>,
      <h1>Kamu kurang makan</h1>,
    ];
  } else if (time >= 10800 && stats.energy <= 25) {
    return [
      <iframe
        width="853"
        height="480"
        src="https://www.youtube.com/embed/MS8OawQegYE?&autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>,
      <h1>Kamu kurang tidur</h1>,
    ];
  } else if (stats.hunger <= 0) {
    return [
      <iframe
        width="853"
        height="480"
        src="https://www.youtube.com/embed/-ZGlaAxB7nI?&autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>,
      <h1>Kamu Mati</h1>,
    ];
  } else if (time >= 10800 && stats.money === 0) {
    return [
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/gonHJG6z_c0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>,
      <h1>Kamu kurang hemat uang</h1>,
    ];
  }
}
