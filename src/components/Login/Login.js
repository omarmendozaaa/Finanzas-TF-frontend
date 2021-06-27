import Register from "./../../img/register.svg";
import Log from "./../../img/log.svg";
import { useState } from "react";
import "./../../assets/css/style_login.css"
function Login({ login, singup, showError }) {
  const [changeview, setChangeview] = useState("container");
  const registerview = () => {
    setChangeview("container sign-up-mode");
  };
  const loginview = () => {
    setChangeview("container");
  };
  //LOGIN ------------------------------------------------------------------
  const [emailAndPass, setEmailAndPass] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setEmailAndPass({
      ...emailAndPass,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(emailAndPass.email, emailAndPass.password);
    } catch (error) {
      showError(error);
      console.log(error);
    }
  }
  //SINGUP----------------------------------------------------------------------
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  function handleInputChangeSing(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  async function handleInputSing(e) {
    e.preventDefault();

    try {
      await singup(user);
    } catch (error) {
      showError(error);
      console.log(error);
    }
  }

  return (
    <div className={changeview}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">En dónde nos quedamos?</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Correo electrónico"
                name="email"
                required
                onChange={handleInputChange}
                value={emailAndPass.email}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handleInputChange}
                value={emailAndPass.password}
              />
            </div>
            <input type="submit" value="Iniciar Sesión" className="btn solid" />
          </form>
          <form action="#" className="sign-up-form" onSubmit={handleInputSing}>
            <h2 className="title">Registrate</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombres"
                name = "firstname"
                // required
                onChange={handleInputChangeSing}
                value={user.firstname}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Apellidos"
                name = "lastname"
                // required
                onChange={handleInputChangeSing}
                value={user.lastname}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name = "email"
                // required
                onChange={handleInputChangeSing}
                value={user.email}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name = "password"
                // required
                onChange={handleInputChangeSing}
                value={user.password}
              />
            </div>
            <input
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
