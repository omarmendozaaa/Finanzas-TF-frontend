import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavbarBrand, Nav, NavItem } from "reactstrap";

function Sidebar(props) {
  const location = useLocation();
  // eslint-disable-next-line
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
      // case "/dashboard":
      //   setDashboard("dashboard");
      //   break;
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
      <Nav vertical className="ulsidebar">
        {/* <NavItem className={dashboard}>
          <i className="fas fa-home"></i> <NavbarBrand className="mr-auto" href="/dashboard">Dashboard</NavbarBrand >
        </NavItem> */}
        <NavItem className={facturas}>
          <i className="fas fa-folder"></i> <NavbarBrand href="/facturas">Facturas</NavbarBrand>
        </NavItem>
        <NavItem className={letras}>
          <i className="fas fa-book"></i> <NavbarBrand href="/letras">Letras</NavbarBrand>
        </NavItem>
        <NavItem className={recibos}>
          <i className="fas fa-calendar"></i> <NavbarBrand href="/recibos">Recibos</NavbarBrand>
        </NavItem>
        <NavItem className={clientes}>
          <i className="fas fa-user-friends"></i>{" "}
          <NavbarBrand href="/clientes">Clientes</NavbarBrand>
        </NavItem>
        <NavItem className={config}>
          <i className="fas fa-cog"></i> <NavbarBrand href="https://omarmendozaaa.github.io/My-Site/">Configuración</NavbarBrand>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Sidebar;
