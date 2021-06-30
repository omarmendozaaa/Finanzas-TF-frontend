import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavbarBrand  } from "reactstrap";

function Sidebar(props) {
  const location = useLocation();
  const [dashboard, setDashboard] = useState();
  const [facturas, setFacturas] = useState();
  const [letras, setLetras] = useState();
  const [recibos, setRecibos] = useState();
  const [clientes, setClientes] = useState();
  const [config, setConfig] = useState();
  useEffect(() => {
    setDashboard("");
    setFacturas("");
    setLetras("");
    setRecibos("");
    setClientes("");
    setConfig("");
    console.log(location.pathname)
    switch (location.pathname) {
      case "/dashboard":
        setDashboard("dashboard");
        break;
      case "/facturas":
        setFacturas("dashboard");
        break;
      case "/letras":
        setLetras("dashboard");
        break;
      case "/recibos":
        setRecibos("dashboard");
        break;
      case "/clientes":
        setClientes("dashboard");
        break;
      case "/config":
        setConfig("dashboard");
        break;
      default:
        setDashboard("");
        setFacturas("");
        setLetras("");
        setRecibos("");
        setClientes("");
        setConfig("");
        break;
    }
  }, [location]);
  return (
    <div className="sidebar-noreact">
      <ul className="ulsidebar">
        <li className={dashboard}>
          <i className="fas fa-home"></i> <NavbarBrand className="mr-auto" href="/dashboard">Dashboard</NavbarBrand >
        </li>
        <li className={facturas}>
          <i className="fas fa-folder"></i> <NavbarBrand href="/facturas">Facturas</NavbarBrand>
        </li>
        <li className={letras}>
          <i className="fas fa-book"></i> <NavbarBrand href="/letras">Letras</NavbarBrand>
        </li>
        <li className={recibos}>
          <i className="fas fa-calendar"></i> <NavbarBrand href="/recibos">Recibos</NavbarBrand>
        </li>
        <li className={clientes}>
          <i className="fas fa-user-friends"></i>{" "}
          <NavbarBrand href="/clientes">Clientes</NavbarBrand>
        </li>
        <li className={config}>
          <i className="fas fa-cog"></i> <NavbarBrand href="/config">Configuración</NavbarBrand>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
