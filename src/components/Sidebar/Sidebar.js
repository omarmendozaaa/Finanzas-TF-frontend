import React from "react";
function Sidebar(props) {
  return (
    <div className="sidebar">
      <ul>
        <li className="dashboard">
          <i className="fas fa-home"></i>{" "}
          <a href="/dashboard" >
            Dashboard
          </a>
        </li>
        <li className="">
          <i className="fas fa-folder"></i>{" "}
          <a href="/facturas" >
            Facturas
          </a>
        </li>
        <li className="">
          <i className="fas fa-book"></i>{" "}
          <a href="/letras" >
            Letras
          </a>
        </li>
        <li className="">
          <i className="fas fa-calendar"></i>{" "}
          <a href="/recibos" >
            Recibos
          </a>
        </li>
        <li className="">
          <i className="fas fa-user-friends"></i>{" "}
          <a href="/clientes">
            Clientes
          </a>
        </li>
        <li className="">
          <i className="fas fa-cog"></i>{" "}
          <a href="/config" >
            Configuración
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
