import React, { useState } from "react";
import Log from "./../../img/welcome.svg";
import axios from "axios";
import { useHistory } from "react-router";

function Empresa(props) {
  const [ruc, setRuc] = useState(String);
  const [razonSocial, setRazonSocial] = useState(String);
  const [estado, setEstado] = useState(String);
  const [departamento, setDepartamento] = useState(String);
  const [provincia, setProvincia] = useState(String);
  const [distrito, setDistrito] = useState(String);
  const [direccion, setDireccion] = useState(String);
  const url = "https://dniruc.apisperu.com/api/v1/ruc/";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1lbmRvemF2YWxsZWpvc29tYXJAZ21haWwuY29tIn0.jzc4vUiz49EMl0PrN5kNAqx7RjiJTsbUySMDtZ64FxQ";
  const datita = {
    ruc,
    razonSocial,
    estado,
    departamento,
    provincia,
    distrito,
    direccion,
    logo: null,
  };

  const history = useHistory();

  async function getempresabyuser() {
    await axios
      .get("https://localhost:5001/api/Empresas/byuser")
      .then((res) => {
        if (res.status === 204) {
          history.push("./welcome");
        } else {
          history.push("./dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function llenarempresa() {
    await fetch(`${url}${ruc}?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setRazonSocial(data.razonSocial);
        setEstado(data.estado);
        setDepartamento(data.departamento === null ? "" : data.departamento);
        setProvincia(data.provincia === null ? "" : data.provincia);
        setDistrito(data.distrito === null ? "" : data.distrito);
        setDireccion(data.direccion === null ? "" : data.direccion);
      });
  }

  async function crearempresa() {
    await axios
      .post("https://localhost:5001/api/Empresas", datita)
      .then((res) => {
        console.log(res);
        getempresabyuser();
      });
  }

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Tu empresa</h2>
            <div className="input-field">
              <i className="fas fa-barcode"></i>
              <input
                name="ruc"
                value={ruc}
                placeholder="RUC"
                onChange={(e) => {
                  setRuc(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-signature"></i>
              <input
                value={razonSocial}
                placeholder="Razon Social"
                name="razonSocial"
                onClick={llenarempresa}
                onChange={(e) => setRazonSocial(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={departamento}
                name="departamento"
                placeholder="Departamento"
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={provincia}
                name="provincia"
                placeholder="Provincia"
                onChange={(e) => setProvincia(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={distrito}
                placeholder="Distrito"
                name="distrito"
                onChange={(e) => setDistrito(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-location-arrow"></i>
              <input
                value={direccion}
                name="direccion"
                placeholder="Dirección de la empresa"
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <input type="submit" className="btn solid" onClick={crearempresa} />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h1>Bienvenido</h1>
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

export default Empresa;
