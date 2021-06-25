import "./App.css";
import Login from "./components/Login/Login.js";
import Empresa from "./components/Welcome/Empresa";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { componentDidMount } from "./components/app";
function App() {
  componentDidMount();
  return (
    <div>
      <Router>
        <Switch>
          <Router exact path="/">
            <Login />
          </Router>
          <Router exact path="/welcome">
            <Empresa/>
          </Router>
          <Router exact path= "/dashboard">
            <h1>PINGA2</h1>
          </Router>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
