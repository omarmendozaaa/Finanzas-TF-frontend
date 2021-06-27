import React from "react";
import "./../../assets/css/dashboard.css";
import DashBody from "../DashBody/DashBody";
function Dashboard({ showError, user, logout }) {
  return (
    <div className="body">
      <div className="cont-dash">
        <DashBody user={user} showError={showError} logout={logout}/>
      </div>
    </div>
  );
}

export default Dashboard;
