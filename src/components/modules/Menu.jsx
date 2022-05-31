import { useState, useContext, useEffect, useRef } from "react";

import { gameContext } from "../Game";

export default function menu(menu) {
  const { stats, setStats, inventory, setInventory, time, setTimeKey } =
    useContext(gameContext);
  const lamaTidur = useRef(null);

  const [statsAdder, setStatsAdder] = useState({
    hunger: 0,
    fun: 0,
    energy: 0,
    happiness: 0,
  });
  const [expectedTime, setExpectedTime] = useState(-1);

  useEffect(() => {
    if (expectedTime !== -1) {
      var hungertest = stats.hunger + statsAdder.hunger;
      var happinesstest = stats.happiness + statsAdder.happiness;
      var funtest = stats.fun + statsAdder.fun;
      var energytest = stats.energy + statsAdder.energy;
      if (hungertest > 100) hungertest = 100;
      if (happinesstest > 100) happinesstest = 100;
      if (funtest > 100) funtest = 100;
      if (energytest > 100) energytest = 100;
      setStats({
        hunger: hungertest,
        happiness: happinesstest,
        fun: funtest,
        energy: energytest,
      });
      console.log(stats);
    } else if (expectedTime === time) {
      setStatsAdder({
        hunger: 0,
        fun: 0,
        energy: 0,
        happiness: 0,
      });
      setExpectedTime(-1);
      setTimeKey(500);
    }
  }, [time]);

  if (menu.menu === "belajar") {
    return (
      <div>
        <h1>ini menu Belajar</h1>
      </div>
    );
  } else if (menu.menu === "makan") {
    return (
      <div>
        <h1>Ini Makan</h1>
        {inventory.map((item, idx) => {
          if (item.stock > 0) {
            return (
              <button
                key={idx}
                onClick={() => {
                  if (stats.hunger + item.hunger >= 100) {
                    setStats({ ...stats, hunger: 100 });
                  } else {
                    setStats({ ...stats, hunger: stats.hunger + item.hunger });
                  }
                }}
              >
                {item.nama}
              </button>
            );
          }
        })}
      </div>
    );
  } else if (menu.menu === "tidur") {
    return (
      <div>
        <h1>Ini tidur</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (lamaTidur.current.value !== "") {
              if (expectedTime === -1) {
                setStatsAdder({
                  ...statsAdder,
                  energy: 10,
                });
                setExpectedTime(time + Number(lamaTidur.current.value * 60));
                setTimeKey(1000);
              } else {
                alert("Kamu sedang melakukan hal lain");
              }
            } else {
              alert("Input tidak boleh kosong");
            }
          }}
        >
          <input type="number" placeholder="0" ref={lamaTidur}></input>
          <button type="submit">Tidur</button>
        </form>
      </div>
    );
  } else if (menu.menu === "fun") {
    return (
      <div>
        <h1>Ini fun</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Ini menu default</h1>
      </div>
    );
  }
}
