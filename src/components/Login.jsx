import { useContext, useRef } from "react";
import { basicInfo } from "../App";
import listAvatar from "./data/listAvatar";

export default function Login() {
  const { setName, setIsLoggedIn, gender, setGender, setProdi } =
    useContext(basicInfo);
  const name = useRef();
  const prodi = useRef();

  return (
    <div className="login container-md">
      <div className="char row">
        <img
          src="https://img.icons8.com/external-those-icons-fill-those-icons/96/000000/external-left-arrows-those-icons-fill-those-icons-3.png"
          onClick={() => setGender(+!gender)}
          className="col-2 align-self-center"
        />
        <img src={listAvatar[gender]} className="col-8" />
        <img
          src="https://img.icons8.com/external-those-icons-fill-those-icons/96/000000/external-left-arrows-those-icons-fill-those-icons-3.png"
          onClick={() => setGender(+!gender)}
          style={{ transform: "scaleX(-1)" }}
          className="col-2 align-self-center"
        />
      </div>
      <div className="form row text-center">
        <form
          className="form-login"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.current.value != "" && prodi.current.value != "") {
              setName(name.current.value);
              setProdi(prodi.current.value);
              setIsLoggedIn(true);
            } else alert("Please fill all the fields");
          }}
        >
          <input
            type="text"
            className="form-control my-2"
            placeholder="Nama"
            ref={name}
          />
          <select className="form-select my-2" defaultValue="" ref={prodi}>
            <option value="" disabled hidden>
              Program Studi
            </option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Teknik Kimia">Teknik Kimia</option>
            <option value="Teknik Mesin">Teknik Mesin</option>
          </select>
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
