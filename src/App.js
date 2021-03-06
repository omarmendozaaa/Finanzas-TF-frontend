import "./App.css";
import Login from "./components/Login/Login.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { componentDidMount } from "./components/app";
import {
  deleteToken,
  getToken,
  initAxiosInterceptors,
  setToken,
} from "./Helpers/auth";
import { useEffect, useState } from "react";
import Welcome from "./components/Welcome/Welcome";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
import Error from "./components/Error/Error";
import Loading from "./components/Loading";
import Factura from "./components/Views/Factura"
import Recibos from "./components/Views/Recibos"
import Letras from "./components/Views/Letras"
import Clientes from "./components/Views/Clientes"
import Config from "./components/Views/Config"
initAxiosInterceptors();

function App() {
  componentDidMount();
  const [user, setUser] = useState(null);
  const [empresastatus, setEmpresaStatus] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  async function loaduser() {
    if (!getToken()) {
      setLoadingUser(false);
      console.log("no hay token");
      return;
    }
    try {
      const { data } = await axios.get(
        "https://localhost:5001/CuentasControllers/getuser"
      );
      const { status } = await axios.get(
        "https://localhost:5001/api/Empresas/byuser"
      );
      setUser(data);
      setEmpresaStatus(status);
      setLoadingUser(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loaduser();
  }, []);

  async function login(email, password) {
    const { data } = await axios.post(
      "https://localhost:5001/CuentasControllers/Login",
      { email, password }
    );
    setToken(data.token);
    loaduser();
  }

  async function singup(user) {
    const { data } = await axios.post(
      "https://localhost:5001/CuentasControllers/Singin",
      user
    );
    setToken(data.token);
    loaduser();
  }

  async function crearempresa(empresa) {
    const { data } = await axios.post(
      "https://localhost:5001/api/Empresas",
      empresa
    );
    console.log(data);
    loaduser();
  }
  function showError(message) {
    setError(message);
  }

  function hideError() {
    setError(null);
  }

  function logout() {
    setUser(null);
    deleteToken();
  }

  if (loadingUser) {
    return <Loading />;
  }
  return (
    <Router>
      <Error message={error} hideError={hideError} />
      {user ? (
        <LoginRoutes showError={showError} user={user} logout={logout} />
      ) : (
        <LogoutRoutes login={login} singup={singup} showError={showError} />
      )}
    </Router>
  );

  function LoginRoutes({ showError, user, logout }) {
    return (
      <div>
        {empresastatus === 204 ? (
          <Switch>
            <Route
              default
              render={(props) => (
                <Welcome
                  {...props}
                  showError={showError}
                  user={user}
                  crearempresa={crearempresa}
                />
              )}
            ></Route>
          </Switch>
        ) : (
          <Switch>
            <Route
            path="/facturas"
            render={(props)=>(<Factura {...props} logout={logout} showError={showError} user={user}/>)}>
            </Route>
            <Route
            path="/recibos"
            render={(props)=>(<Recibos {...props} logout={logout} showError={showError} user={user}/>)}>
            </Route>
            <Route
            path="/letras"
            render={(props)=>(<Letras {...props} logout={logout} showError={showError}  user={user} />)}>
            </Route>
            <Route
            path="/clientes"
            render={(props)=>(<Clientes {...props} logout={logout} showError={showError} user={user}/>)}>
            </Route>
            <Route
            path="/config"
            render={(props)=>(<Config {...props} logout={logout} showError={showError}  user={user}/>)}>
            </Route>

            <Route
              default
              render={(props) => (
                <Dashboard
                  {...props}
                  showError={showError}
                  user={user}
                  logout={logout}
                />
              )}
            ></Route>

          </Switch>
        )}
      </div>
    );
  }
  function LogoutRoutes({ login, singup, showError }) {
    return (
      <Switch>
        <Route
          default
          render={(props) => (
            <Login
              {...props}
              login={login}
              singup={singup}
              showError={showError}
            />
          )}
        />
        {/* POSIBLE LANDING PAGE */}
        {/* <Route default>
          <h1>LANDINGPAGE</h1>
        </Route> */}
      </Switch>
    );
  }
}

export default App;
