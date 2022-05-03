import { useContext, useRef } from "react";
import { basicInfo } from "../App";
import male from "../assets/char/0_login.jpg";
import female from "../assets/char/1_login.jpg";

export default function Login() {
  const { setName, setIsLoggedIn, gender, setGender, setProdi } =
    useContext(basicInfo);
  const name = useRef();
  const prodi = useRef();
  const test = [male, female];
  return (
    <div className="login">
      <div className="char row">
        <img
          src="https://img.icons8.com/external-those-icons-fill-those-icons/96/000000/external-left-arrows-those-icons-fill-those-icons-3.png"
          onClick={() => setGender(+!gender)}
          className="col-2 align-self-center"
        />
        <img src={test[gender]} className="col-8" />
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
            if (
              name.current.value != "" &&
              prodi.current.value != "Program Studi"
            ) {
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
          <select className="form-select my-2" ref={prodi}>
            <option defaultValue>Program Studi</option>
            <option value="1">Teknik Informatika</option>
            <option value="2">Teknik Kimia</option>
            <option value="3">Teknik Mesin</option>
          </select>
          <button className="btn btn-lg btn-primary btn-block">LOGIN</button>
        </form>
      </div>
    </div>
  );
}
