import React from "react";
import FacturasBody from "../DashBodys/FacturasBody";
import Sidebar from "../Sidebar/Sidebar";

function Factura({ user, showError, logout }) {
  return (
    <div className="body">
      <div className="cont-dash">
        <div className="container-body">
          <Sidebar />
          <FacturasBody showError={showError} logout={logout} user = {user} />
        </div>
      </div>
    </div>
  );
}

export default Factura;
