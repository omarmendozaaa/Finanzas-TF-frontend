import React, { useState } from "react";
import Log from "./../../img/welcome.svg";
import axios from "axios";

function Welcome({ showError, user }) {
  const [empresa, setEmpresa] = useState({
    ruc: "",
    razonSocial: "",
    estado: "",
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    logo: null,
  });
  const url = "https://dniruc.apisperu.com/api/v1/ruc/";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1lbmRvemF2YWxsZWpvc29tYXJAZ21haWwuY29tIn0.jzc4vUiz49EMl0PrN5kNAqx7RjiJTsbUySMDtZ64FxQ";

  async function llenarempresa() {
    await fetch(`${url}${empresa.ruc}?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setEmpresa({
          razonSocial: data.razonSocial,
          estado: data.estado,
          departamento: data.departamento === null ? "" : data.departamento,
          provincia: data.provincia === null ? "" : data.provincia,
          distrito: data.distrito === null ? "" : data.distrito,
          direccion: data.direccion === null ? "" : data.direccion,
        });
      });
  }

  async function crearempresa() {
    await axios.post("https://localhost:5001/api/Empresas", empresa);
  }
  function handleInputChange(e) {
    llenarempresa();
    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={crearempresa}>
            <h2 className="title">Tu empresa</h2>
            <div className="input-field">
              <i className="fas fa-barcode"></i>
              <input
                name="ruc"
                value={empresa.ruc}
                placeholder="RUC"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-signature"></i>
              <input
                value={empresa.razonSocial}
                placeholder="Razon Social"
                name="razonSocial"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={empresa.departamento}
                name="departamento"
                placeholder="Departamento"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={empresa.provincia}
                name="provincia"
                placeholder="Provincia"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={empresa.distrito}
                placeholder="Distrito"
                name="distrito"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={empresa.direccion}
                name="direccion"
                placeholder="Dirección de la empresa"
                onChange={handleInputChange}
              />
            </div>
            <input type="submit" className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h1>Bienvenido {user.firstName}</h1>
            <p>
              Nosotros nos encargaremos de la administración de tu cartera de
              descuentos. Necesitaremos datos sobre tu empresa para comenzar. Si
              no tienes una empresa formalizada, no te preocupes. Con tu razón
              social nos basta
            </p>
            <h1>📣</h1>
          </div>
          <img src={Log} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
