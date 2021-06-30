import React from "react";
import Header from "../Header/Header";
import { Button } from "reactstrap";
function ClientesBody({ user, showError, logout }) {
  return (
    <div className="main-body">
      <Header showError={showError} logout={logout} />
      <div className="tittle">
        <span className="greeting">Hola {user.firstName},</span>
        <h2>Mis Clientes</h2>
      </div>
      <div className="button-clients">
        <Button color="primary"> Agregar Cliente </Button>
      </div>
      <div className="table-clients">
        <div className="table"></div>
        <div className="table-top"></div>
      </div>
    </div>
  );
}

export default ClientesBody;
