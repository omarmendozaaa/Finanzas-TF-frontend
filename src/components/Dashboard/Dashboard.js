import React from "react";
import "./../../assets/css/dashboard.css";
import Sidebar from "./../../components/Sidebar/Sidebar"
import MainBody from "../DashBodys/MainBody"
function Dashboard({ showError, user, logout }) {
  return (
    <div className="body">
      <div className="cont-dash">
      <div className="container-body">
            <Sidebar/>
            <MainBody user={user} showError={showError} logout={logout}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
