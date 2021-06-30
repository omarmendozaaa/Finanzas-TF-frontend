import React from "react";
import { Redirect } from "react-router";
function Header({ logout, showError }) {
  const hoy = new Date();
  function handleInputChange(e) {
    e.preventDefault();
    try {
      logout();
      return(<Redirect to = "/login"></Redirect>)
    } catch (error) {
      showError(error);
      console.log(error);
    }
  }
  return (
    <div className="navbar">
      <div className="hora">
        <span style={{ fontSize: "1em" }}>{hoy.toDateString()}</span>
      </div>
      <div className="logout">
        <button className="button-logout" onClick={handleInputChange}>
          <i
            style={{ fontSize: "25px", color: "gray" }}
            className="fas fa-arrow-down"
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
