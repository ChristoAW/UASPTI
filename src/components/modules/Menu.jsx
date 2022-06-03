import { useState, useContext, useEffect, useRef } from "react";

import { gameContext } from "../Game";
import { basicInfo } from "../../App";
import { avatarContext } from "../Main";
import listBelajar from "../data/listBelajar";
import listFun from "../data/listFun";
import listMakanan from "../data/listMakanan";
import listAvatar from "../data/listAvatar";
import kasur from "../../assets/kasur.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

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

  const { gender } = useContext(basicInfo);
  const { avatar, setAvatar } = useContext(avatarContext);

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
            item.nilai += 0.125;
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

  if (menu === "Belajar") {
    return (
      <div className="container" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          {listBelajar
            .find((list) => list.prodi === prodi)
            .mataKuliah.map((matKul, index) => (
              <div
                className="col 3"
                key={index}
                onClick={() => {
                  if (expectedTime === -1) {
                    setIndexMatkul(index);
                    setStatsAdder({ ...statsAdder, fun: -0.125 });
                    setExpectedTime(time + Number(60));
                    setTimeKey(10);
                  } else {
                    alert("Kamu sedang melakukan hal lain");
                  }
                  setAvatar(gender + 12);
                }}
                style={{
                  border: "solid 5px white",
                  backgroundImage: `url(${matKul.gambar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p>{matKul.nama}</p>
              </div>
            ))}
        </div>
      </div>
    );
  } else if (menu === "Makan") {
    return (
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          mousewheel={{ invert: false }}
          style={{
            height: "220px",
            width: "auto",
            backgroundColor: "transparant",
          }}
        >
          <div>
            {inventory.map((item, idx) => {
              if (item.stock !== 0) {
                return (
                  <SwiperSlide
                    key={idx}
                    style={{
                      backgroundImage: "url(" + item.gambar + ")",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      borderRadius: "2px",
                    }}
                    onClick={() => {
                      if (stats.hunger < 100 || stats.fun < 100) {
                        if (expectedTime === -1) {
                          setInventory(
                            inventory.map((item, id) => {
                              if (id === idx) item.stock -= 1;
                              return item;
                            })
                          );
                          setExpectedTime(time + 15);
                          setTimeKey(10);
                          if (
                            stats.hunger + item.hunger >= 100 &&
                            stats.fun + item.fun >= 100
                          )
                            setStats({ ...stats, hunger: 100, fun: 100 });
                          else if (
                            stats.hunger + item.hunger >= 100 &&
                            stats.fun + item.fun < 100
                          )
                            setStats({
                              ...stats,
                              hunger: 100,
                              fun: stats.fun + item.fun,
                            });
                          else if (
                            stats.hunger + item.hunger < 100 &&
                            stats.fun + item.fun >= 100
                          )
                            setStats({
                              ...stats,
                              hunger: stats.hunger + item.hunger,
                              fun: 100,
                            });
                          else {
                            setStats({
                              ...stats,
                              hunger: stats.hunger + item.hunger,
                              fun: stats.fun + item.fun,
                            });
                            setAvatar(gender + 14);
                          }
                        } else {
                          alert("Kamu sedang melakukan hal lain");
                        }
                      } else alert("kamu kekenyangan");
                    }}
                  >
                    <div className="statsMakanan col-12">
                      <div className="col-12 isiStatsMakanan">
                        <h4 className="row center">{item.nama}</h4>
                        <p className="row">Hunger : +{item.hunger}</p>
                        <p className="row">Fun : +{item.fun}</p>
                        <p className="row">Stock :{item.stock}</p>
                      </div>
                    </div>
                  </SwiperSlide>
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
        </Swiper>
      </div>
    );
  } else if (menu === "Tidur") {
    return (
      <div className="container">
        <div
          className="kasur"
          style={{
            backgroundPosition: "center",
            backgroundImage: `url(${kasur})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
          }}
        >
          <div
            className="inputKasur"
            style={{ borderRadius: "5px", margin: "auto" }}
          >
            Mau Tidur Berapa Jam?
            <form
              style={{ borderRadius: "5px" }}
              className="inputKasur"
              onSubmit={(e) => {
                e.preventDefault();
                if (lamaTidur.current.value !== "") {
                  if (expectedTime === -1) {
                    setStatsAdder({
                      ...statsAdder,
                      energy: 0.5,
                    });
                    setExpectedTime(
                      time + Number(lamaTidur.current.value * 60)
                    );
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
              <button
                type="submit"
                style={{ borderRadius: "3px", border: "none" }}
              >
                Tidur
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (menu === "Fun") {
    return (
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          mousewheel={{ invert: false }}
          style={{
            height: "220px",
            width: "auto",
            backgroundColor: "transparant",
          }}
        >
          {listFun.map((item, idx) => {
            if (stats.fun < 100) {
              return (
                <SwiperSlide
                  key={idx}
                  style={{
                    backgroundImage: "url(" + item.gambar + ")",
                    backgroundPosition: "center",
                    borderRadius: "2px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => {
                    if (stats.fun + item.fun >= 100) {
                      setStats({ ...stats, fun: 100 });
                      setExpectedTime(time + Number(60));
                      setTimeKey(10);
                    } else {
                      setStats({ ...stats, fun: stats.fun + item.fun });
                      setExpectedTime(time + Number(60));
                      setTimeKey(10);
                    }
                    setAvatar(gender + (Number(idx) + 1) * 2);
                  }}
                >
                  <div className="statsMakanan col-12">
                    <p className="namaFun">{item.nama}</p>
                    <p className="namaFun">Hunger : -{item.hunger}</p>
                    <p className="namaFun">Fun : +{item.fun}</p>
                    <p className="namaFun">Energy : -{item.energy}</p>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    );
  } else if (menu === "Belanja") {
    return (
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          mousewheel={{ invert: false }}
          style={{ height: "220px", backgroundColor: "white" }}
        >
          <div id="gambarMenu" className="row">
            <h1>Ini Belanja</h1>
            {listMakanan.map((makanan, index) => (
              <SwiperSlide
                key={index}
                style={{
                  backgroundImage: "url(" + makanan.gambar + ")",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "2px",
                }}
                onClick={() => {
                  if (stats.money >= makanan.harga) {
                    setInventory(
                      inventory.map((item, id) => {
                        if (id === index) item.stock++;
                        return item;
                      })
                    );
                    setStats({ ...stats, money: stats.money - makanan.harga });
                  }
                }}
              >
                <div className="statsMakanan col-12">
                  <div className="col-12 isiStatsMakanan">
                    <h4 className="row center">{makanan.nama}</h4>
                    <p className="row">Harga : {makanan.harga}</p>
                    <p className="row">Hunger : +{makanan.hunger}</p>
                    <p className="row">Fun : +{makanan.fun}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    );
  } else if (menu === "About Us") {
    return (
      <div className="aboutUs">
        <h1>About Us</h1>
        <h4>Dibuat Oleh : Kelompok BOCAN</h4>
        <h4>53752 - Andrew Natanael Tjandra</h4>
        <h4>55420 - Christophorus Augusta Wangsa </h4>
        <h4>55266 - Edison Sigmund </h4>
        <h4>54004 - Marcellino Osmon </h4>
      </div>
    );
  } else {
    return;
  }
}
