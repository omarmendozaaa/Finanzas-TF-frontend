import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import ClientesModal from "../FormsModal/ClientesModal";
import ClientesTable from "../Tables/ClientesTable";
import axios from "axios";
function ClientesBody({ user, showError, logout }) {
  // eslint-disable-next-line
  const [clientes, setClientes] = useState([]);
  async function getclientes() {
    await axios
      .get("https://localhost:5001/api/Clientes/byuser")
      .then((res) => {
        console.log(res.data);
        setClientes(res.data);
      });
  }
  useEffect(() => {
    getclientes();
  }, []);
  return (
    <div className="main-body">
      <Header showError={showError} logout={logout} />
      <div className="tittle">
        <span className="greeting">Hola {user.firstName},</span>
        <h2>Mis Clientes</h2>
      </div>
      <div className="button-clients">
        <ClientesModal color="primary" getclientes={getclientes}>
          {" "}
          Agregar Cliente{" "}
        </ClientesModal>
      </div>
      <div className="table-clients">
        <div className="table">
          <h3>Clientes</h3>
          <ClientesTable clientes={clientes} />
        </div>
        <div className="table-top"></div>
      </div>
    </div>
  );
}

export default ClientesBody;
