import { useState } from "react";
import Login from "./components/Login";
import Game from "./components/Game";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState(0);
  return (
    <div className="container">
      <div className="header text-center">
        <h1>7 DAY STUDENT</h1>
        <hr />
      </div>
      {isLoggedIn ? <Game /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}
