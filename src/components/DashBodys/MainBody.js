import React from "react";
import Header from "../Header/Header";
import "../../assets/css/dashboard.css"
function MainBody({ user, showError, logout }) {
  return (
    <div className="main-body">
      <Header showError={showError} logout={logout} />
      <div className="tittle">
        <span className="greeting">Hola {user.firstName},</span>
        <h2>Información General</h2>
        <div className="table-dashboard">
          <div className="dash-left"></div>
          <div className="dash-rigth">
            <div className="chart-pie"></div>
            <div className="chart-opera"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBody;
