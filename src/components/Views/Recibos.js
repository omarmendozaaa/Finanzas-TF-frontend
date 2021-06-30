import React from 'react';
import RecibosBody from "./../../components/DashBodys/RecibosBody"
import Sidebar from "../Sidebar/Sidebar";
function Recibos({ user, showError, logout }) {
    return (
        <div className="body">
        <div className="cont-dash">
          <div className="container-body">
            <Sidebar />
            <RecibosBody showError={showError} logout={logout} user={user}/>
          </div>
        </div>
      </div>
    );
}

export default Recibos;