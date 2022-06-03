import { useContext } from "react";

import { gameContext } from "../Game";
import { phoneContext } from "../Phone";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Grid } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import listMakanan from "../data/listMakanan";

export default function PhoneMenu() {
  const { news, inventory, setInventory, stats, setStats } =
    useContext(gameContext);
  const { phoneMenu, setPhoneMenu } = useContext(phoneContext);
  if (phoneMenu === "home") {
    return (
      <div className="apps text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
          alt="youtube"
          onClick={() => setPhoneMenu("youtube")}
          style={{ height: "100px", margin: "10px" }}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/21/21601.png"
          alt="News"
          onClick={() => setPhoneMenu("news")}
          style={{ height: "125px", filter: "invert(100%)", margin: "10px" }}
        />
        <div className="col-12" onClick={() => setPhoneMenu("gofood")}>
          <img
            src="https://1000logos.net/wp-content/uploads/2020/10/Gofood-logo.png"
            alt="GOFOOD"
            onClick={() => setPhoneMenu("gofood")}
            style={{ height: "100px", margin: "10px" }}
          />
        </div>
      </div>
    );
  } else if (phoneMenu === "youtube") {
    return (
      <div>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    );
  } else if (phoneMenu === "news") {
    return (
      <div style={{ width: "100%" }}>
        <Swiper
          modules={[Mousewheel, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop="true"
          direction="vertical"
          pagination
          mousewheel={{ invert: false }}
          style={{
            height: "400px",
            backgroundColor: "rgba(255,255,255,0.5",
            borderRadius: "5px",
          }}
        >
          {news.map((news, index) => (
            <SwiperSlide
              key={index}
              onClick={() => window.open(news.url, "_blank")}
              style={{
                padding: "10px",
                borderRadius: "5px",
                paddingRight: "30px",
              }}
            >
              <img
                src={news.urlToImage}
                alt="news"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
              <h2 style={{ marginTop: "10px", marginBottom: "0" }}>
                {news.title}
              </h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    return (
      <Swiper
        modules={[Mousewheel, Grid]}
        spaceBetween={50}
        slidesPerView={1}
        direction="vertical"
        pagination
        mousewheel={{ invert: false }}
        style={{
          height: "400px",
          backgroundColor: "rgba(255,255,255,0.5)",
          borderRadius: "5px",
        }}
      >
        {listMakanan.map((makanan, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              if (stats.money >= makanan.harga * 1.2) {
                setInventory(
                  inventory.map((item, id) => {
                    if (id === index) item.stock++;
                    return item;
                  })
                );
                setStats({
                  ...stats,
                  money: stats.money - makanan.harga * 1.2,
                });
              }
            }}
          >
            <img
              src={makanan.gambar}
              style={{ width: "100%", height: "250px", overflow: "hidden" }}
            />
            <div style={{ backgroundColor: "white", padding: "40px" }}>
              <h2>{makanan.nama}</h2>
              <h4>{makanan.harga * 1.2}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
}
