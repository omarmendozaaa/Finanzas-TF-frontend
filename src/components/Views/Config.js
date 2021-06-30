import React from 'react';
import ConfigBody from './../DashBodys/ConfigBody';
import Sidebar from "../Sidebar/Sidebar";
function Config({ user, showError, logout }) {
    return (
        <div className="body">
        <div className="cont-dash">
          <div className="container-body">
            <Sidebar />
            <ConfigBody showError={showError} logout={logout} />
          </div>
        </div>
      </div>
    );
}

export default Config;