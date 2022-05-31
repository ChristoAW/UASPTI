import { useState, createContext } from "react";
import Login from "./components/Login";
import Game from "./components/Game";

import "./style.css";

export const basicInfo = createContext(null);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gender, setGender] = useState(0);
  const [name, setName] = useState("");
  const [prodi, setProdi] = useState(0);
  return (
    <div className="container-fluid">
      <div className="header text-center">
        <h1 className="pt-3">7 DAY STUDENT</h1>
        <hr />
      </div>
      <basicInfo.Provider
        value={{
          setIsLoggedIn,
          name,
          setName,
          prodi,
          setProdi,
          gender,
          setGender,
        }}
      >
        {isLoggedIn ? <Game /> : <Login />}
      </basicInfo.Provider>
    </div>
  );
}
