import React from "react";
import Header from "./../Header/Header"
function MainBody({ user, showError, logout }) {
  return (
    <div className="main-body">
      <Header showError={showError} logout={logout} />
      <div className="tittle">
        <span className="greeting">Hola {user.firstName},</span>
        <h2>Información General</h2>
      </div>
    </div>
  );
}

export default MainBody;
