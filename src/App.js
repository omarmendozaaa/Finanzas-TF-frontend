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
import Loading from "./components/Loading"

initAxiosInterceptors();

function App() {
  componentDidMount();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loaduser() {
      if (!getToken()) {
        setLoadingUser(false);
        console.log("no hay token");
        return;
      }
      try {
        const { data: usuario } = await axios.get(
          "https://localhost:5001/CuentasControllers/getuser"
        );
        setUser(usuario);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    }
    loaduser();
  }, []);

  async function login(email, password) {
    const { data } = await axios.post(
      "https://localhost:5001/CuentasControllers/Login",
      { email, password }
    );

    setUser(data.usuario);
    setToken(data.token);
  }

  async function singup(user) {
    const { data } = await axios.post(
      "https://localhost:5001/CuentasControllers/Singin",
      user
    );
    setUser(data.usuario);
    setToken(data.token);
    console.log(data);
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
      <Switch>
        <Route
          path="/welcome"
          render={(props) => (
            <Welcome {...props} showError={showError} user={user} />
          )}
        />
        <Route
          path="/dashboard"
          render={(props) => (
            <Dashboard
              {...props}
              showError={showError}
              user={user}
              logout={logout}
            />
          )}
        />
      </Switch>
    );
  }
  function LogoutRoutes({ login, singup, showError }) {
    return (
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              login={login}
              singup={singup}
              showError={showError}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
