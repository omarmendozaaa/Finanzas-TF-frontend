import Register from "./../../img/register.svg";
import Log from "./../../img/log.svg";
import "./style_login.css";
import { useState } from "react/cjs/react.development";
import axios from "axios";
import { deleteToken, getToken, initAxiosInterceptors, setToken } from "../../Helpers/auth";
import { useEffect } from "react";
import { componentDidMount } from "./app";


initAxiosInterceptors()

function Login() {
  componentDidMount();
  const [changeview, setChangeview] = useState("container")
  const registerview = () => { setChangeview("container sign-up-mode")}
  const loginview = () => { setChangeview("container")}
  const [usuario, setUser] = useState(null)
  const [cargandousuario, setCargandousuario] = useState(true)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  useEffect(()=>{
    async function cargarusuario(){
      if(!getToken()){
        setCargandousuario(false);
        return
      }
      try{
        const { data: usuario} = await axios.get('https://localhost:5001/CuentasControllers/getuser');
        setUser(usuario);
        setCargandousuario(false);
      }catch(error){
        console.log(error)
      }
    }
    cargarusuario();
  },[]);
  async function login(){
    const {data} = await axios.post('https://localhost:5001/CuentasControllers/Login', {
      email,
      password
    });
    setUser(data.usuario);
    setToken(data.token)
    console.log(data.usuario)
  }
  async function singup(){
    const {data} = await axios.post('https://localhost:5001/CuentasControllers/Singin', {
      email,
      password,
      firstname,
      lastname
    });
    setUser(data.usuario);
    setToken(data.token);
  }
  function logout(){
    setUser(null);
    deleteToken();
  }
  return (
      <div className={changeview}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">En dónde nos quedamos?</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Correo electrónico"
                onChange = {(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password"
                onChange = {(e) => setPassword(e.target.value)}/>
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
                <input type="text" placeholder="Nombres"
                onChange = {(e) => setFirstname(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Apellidos"
                onChange = {(e) => setLastname(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" 
                onChange = {(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" 
                onChange = {(e) => setPassword(e.target.value)}/>
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
                onClick ={registerview}
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
                onClick = {loginview}
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
