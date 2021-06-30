import React from 'react';
import ClientesBody from "./../DashBodys/ClientesBody"
import Sidebar from "../Sidebar/Sidebar";

function Clientes({ user, showError, logout }) {
    return (
        <div className="body">
        <div className="cont-dash">
          <div className="container-body">
            <Sidebar />
            <ClientesBody showError={showError} logout={logout} user={user} />
          </div>
        </div>
      </div>
    );
}

export default Clientes;