import React from 'react';
import LetrasBody from "./../DashBodys/LetrasBody"
import Sidebar from "../Sidebar/Sidebar";
function Letras({ user, showError, logout }) {
    return (
        <div className="body">
        <div className="cont-dash">
          <div className="container-body">
            <Sidebar />
            <LetrasBody showError={showError} logout={logout} user={user}/>
          </div>
        </div>
      </div>
    );
}

export default Letras;