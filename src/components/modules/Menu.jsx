import { useState, useContext, useEffect, useRef } from "react";

import { gameContext } from "../Game";
import { basicInfo } from "../../App";
import listBelajar from "../data/listBelajar";
import listFun from "../data/listFun";

export default function menu({ menu }) {
  const {
    stats,
    setStats,
    inventory,
    setInventory,
    time,
    setTimeKey,
    statsAdder,
    setStatsAdder,
    expectedTime,
    setExpectedTime,
  } = useContext(gameContext);

  const { prodi } = useContext(basicInfo);
  const lamaTidur = useRef(null);
  const [indexMatKul, setIndexMatkul] = useState(null);
  const [nilaiBelajar, setNilaiBelajar] = useState(
    listBelajar
      .find((item) => item.prodi === prodi)
      .mataKuliah.map((item) => item)
  );

  useEffect(() => {
    if (expectedTime != -1) {
      setNilaiBelajar(
        nilaiBelajar.map((item, i) => {
          if (i === indexMatKul) {
            item.nilai += 3;
            if (item.nilai >= 100) item.nilai = 100;
          }
          return item;
        })
      );
      setStatsAdder({
        ...statsAdder,
        intel: nilaiBelajar
          .map((item) => 0.25 * item.nilai)
          .reduce((a, b) => a + b),
      });
      if (expectedTime === time) {
        setIndexMatkul(null);
      }
    }
  }, [time]);

  if (menu === "belajar") {
    return (
      <div>
        <h1>Ini Menu Belajar</h1>
        {listBelajar
          .find((list) => list.prodi === prodi)
          .mataKuliah.map((matKul, index) => (
            <button
              key={index}
              onClick={() => {
                setIndexMatkul(index);
                setExpectedTime(time + Number(60));
                setTimeKey(10);
              }}
            >
              {matKul.nama}
            </button>
          ))}
      </div>
    );
  } else if (menu === "makan") {
    return (
      <div>
        <h1>Ini Makan</h1>
        {inventory.map((item, idx) => {
          if (item.stock !== 0) {
            return (
              <div
                key={idx}
                onClick={() => {
                  if (expectedTime === -1) {
                    setInventory(
                      inventory.map((item, id) => {
                        if (id === idx) {
                          item.stock -= 1;
                        }
                        return item;
                      })
                    );
                    setExpectedTime(time + 15);
                    setTimeKey(10);
                    if (stats.hunger + item.hunger >= 100)
                      setStats({ ...stats, hunger: 100 });
                    else
                      setStats({
                        ...stats,
                        hunger: stats.hunger + item.hunger,
                      });
                  } else {
                    alert("Kamu sedang melakukan hal lain");
                  }
                }}
              >
                <img src={item.gambar} />
                <p>{item.nama}</p>
                <p>{item.stock}</p>
              </div>
            );
          } else {
            return (
              <div key={idx}>
                <img src={item.gambar} />
                <p>{item.nama}</p>
                <p>{item.stock}</p>
              </div>
            );
          }
        })}
        ;
      </div>
    );
  } else if (menu === "tidur") {
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
                setTimeKey(10);
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
  } else if (menu === "fun") {
    return (
      <div>
        <h1>Ini Fun</h1>
        {listFun.map((item, idx) => {
          if (stats.fun < 100) {
            return (
              <button
                key={idx}
                onClick={() => {
                  if (stats.fun + item.fun >= 100) {
                    setStats({ ...stats, fun: 100 });
                    setExpectedTime(time + Number(60));
                    setTimeKey(10);
                  } else {
                    setStats({ ...stats, fun: stats.fun + item.fun });
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
  } else if (menu === "belanja") {
    return (
      <div>
        <h1>Ini Belanja</h1>
        {inventory.map((item, idx) => {
          if (stats.money >= item.harga) {
            return (
              <button
                key={idx}
                onClick={() => {
                  setStats({ ...stats, money: money - item.harga });
                }}
              >
                {item.nama}
              </button>
            );
          }
        })}
      </div>
    );
  } else {
    return;
  }
}
