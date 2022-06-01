import { useContext } from "react";

import { gameContext } from "../Game";
import { phoneContext } from "../Phone";

import listMakanan from "../data/listMakanan";

export default function PhoneMenu() {
  const { news } = useContext(gameContext);
  const { phoneMenu, setPhoneMenu } = useContext(phoneContext);
  if (phoneMenu === "home") {
    return (
      <div>
        <div className="row">
          <div className="col-md-6" onClick={() => setPhoneMenu("youtube")}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
              alt="youtube"
              style={{ width: "200px" }}
            />
          </div>
          <div className="col-md-6" onClick={() => setPhoneMenu("news")}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/21/21601.png"
              alt="News"
              style={{ width: "200px", filter: "invert(100%)" }}
            />
          </div>
          <div className="col-md-6" onClick={() => setPhoneMenu("gofood")}>
            <img
              src="https://1000logos.net/wp-content/uploads/2020/10/Gofood-logo.png"
              alt="GOFOOD"
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>
    );
  } else if (phoneMenu === "youtube") {
    return (
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
        <button onClick={() => setPhoneMenu("home")}>Back</button>
      </div>
    );
  } else if (phoneMenu === "news") {
    return (
      <div style={{ overflow: "scroll" }}>
        <h1>News</h1>
        {news.map((news, index) => (
          <div key={index} onClick={() => window.open(news.url, "_blank")}>
            <img src={news.urlToImage} alt="news" style={{ width: "200px" }} />
            <h1>{news.title}</h1>
          </div>
        ))}
        <button onClick={() => setPhoneMenu("home")}>Back</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>GOFOOD</h1>
        {listMakanan.map((makanan, index) => (
          <div key={index} style={{ border: "2px solid white" }}>
            <p>{makanan.nama}</p>
            <p>{makanan.harga}</p>
          </div>
        ))}
        <button onClick={() => setPhoneMenu("home")}>Back</button>
      </div>
    );
  }
}
