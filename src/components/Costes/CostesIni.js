import React, { useState } from "react";
import { Button, Label, Input } from "reactstrap";
function CostesIni({
  setTotal_cg_ini,
  setCostes_ini,
  total_cg_ini,
  costes_ini,
}) {
  const [motivo, setMotivo] = useState("Portes");
  const [valor, setValor] = useState();
  const coste = {
    motivo,
    valor,
  };
  function agregarcostes_ini() {
    if (isNaN(coste.valor)) {
      console.log("El campo de valor es requerido");
      return
    } else {
      costes_ini.push(coste);
      setCostes_ini(costes_ini);
      total_cg_ini = Number(total_cg_ini) + Number(coste.valor);
      setTotal_cg_ini(total_cg_ini);
      setMotivo("Portes");
      setValor("");
      return
    }
  }
  function cancel(){
    setMotivo("Portes");
    setValor("");
  }
  return (
    <div className="table-costes-ini">
      <h5> Costes / Gastos Iniciales </h5>
      <div className="two-columns">
        <div className="inputs">
          <div className="input-data">
            <Label sm={2}>Motivo: </Label>
            <Input
              value={motivo}
              bsSize="sm"
              type="select"
              onChange={(e) => {
                setMotivo(e.target.value);
              }}
            >
              <option value="Portes">Portes</option>
              <option value="Fotocopias">Fotocopias</option>
              <option value="Comisión de estudio">Comisión de estudio</option>
              <option value="Comisión de desembolso">
                Comisión de desembolso
              </option>
              <option value="Comisión de intermediación">
                Comisión de intermediación
              </option>
              <option value="Gastos de administración">
                Gastos de administración
              </option>
              <option value="Gastos notariales">Gastos notariales</option>
              <option value="Gastos registrales">Gastos registrales</option>
              <option value="Seguro">Seguro</option>
              <option value="Otros gastos">Otros gastos</option>
            </Input>
          </div>
          <div className="input-data">
            <Label sm={4}>Monto: </Label>
            <Input
              value={valor}
              bsSize="sm"
              type="number"
              onChange={(e) => {
                setValor(e.target.value);
              }}
            ></Input>
          </div>
          <br></br>
          <Button outline color="primary" onClick={agregarcostes_ini}>
            Agregar
          </Button>{" "}
          <Button outline color="primary" onClick={cancel}>
            Cancelar
          </Button>{" "}
        </div>
        <div className="output">
          <ul>
            {costes_ini.map((coste) => (
              <li>
                [{coste.motivo}] | VALOR: {coste.valor}
                <button outline color="danger">
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <span>Total Costo / Gasto Inicial: {total_cg_ini}</span>
        </div>
      </div>
    </div>
  );
}

export default CostesIni;
