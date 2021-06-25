import Register from "./../../img/register.svg";
import Log from "./../../img/log.svg";
import "./style_login.css";
import axios from "axios";
import { initAxiosInterceptors, setToken } from "../../Helpers/auth";
import { useHistory } from "react-router-dom";
import { useState } from "react";

initAxiosInterceptors();
function Login() {
  const [changeview, setChangeview] = useState("container");
  const registerview = () => {
    setChangeview("container sign-up-mode");
  };
  const loginview = () => {
    setChangeview("container");
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const history = useHistory();

  async function getempresabyuser() {
    await axios
      .get("https://localhost:5001/api/Empresas/byuser")
      .then((res) => {
        if (res.status === 204) {
          history.push("./welcome");
        } else {
          history.push("./dashboard");
        }
      })
      .catch((erorr) => {
        console.log(console.error());
      });
  }
  async function login() {
    await axios.post(
      "https://localhost:5001/CuentasControllers/Login",
      {
        email,
        password,
      }
    ).then((res)=>{
      setToken(res.data.token);
      getempresabyuser();
    });
  }
  async function singup() {
    await axios.post(
      "https://localhost:5001/CuentasControllers/Singin",
      {
        email,
        password,
        firstname,
        lastname,
      }
    ).then((res)=>{
      setToken(res.data.token);
      getempresabyuser();
    });
  }

  return (
    <div className={changeview}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">En dónde nos quedamos?</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              onClick={login}
              type="submit"
              value="Iniciar Sesión"
              className="btn solid"
            />
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Registrate</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombres"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Apellidos"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              onClick={singup}
              type="submit"
              className="btn"
              value="Regístrate"
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Eres nuevo aquí?</h3>
            <p>
              WalletBullet será tu mejor aliado para administrar tu cartera de
              descuentos.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={registerview}
            >
              Regístrate
            </button>
          </div>
          <img src={Log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Nos volvemos a encontrar?</h3>
            <p>Que dices si continuamos nuestro trabajo?</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={loginview}
            >
              Iniciar Sesion
            </button>
          </div>
          <img src={Register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
