import React from "react";
import Header from "../Header/Header";
import { Button } from "reactstrap";
function RecibosBody({ showError, logout, user}) {
  return (
    <div className="main-body">
      <Header showError={showError} logout={logout} />
      <div className="tittle">
        <span className="greeting">Hola {user.firstName},</span>
        <h2>Mis Recibos</h2>
      </div>
      <div className="button-clients">
        <Button color="primary"> Agregar Recibo </Button>
      </div>
      <div className="table-facturas">
        <div className="table">
          <div className="table-data">
            <div className="table-1"></div>
            <div className="table-2"></div>
          </div>
          <div className="table-costes-ini"></div>
          <div className="table-costes-fin"></div>
        </div>
        <div className="table-top">
          <div className="table-analisis"></div>
          <div className="table-form"></div>
        </div>
      </div>
    </div>
  );
}

export default RecibosBody;
