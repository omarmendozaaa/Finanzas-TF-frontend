import React, { useState } from "react";
import { Button, Label, Input } from "reactstrap";
function CostesFin({
  setTotal_cg_fin,
  setCostes_fin,
  total_cg_fin,
  costes_fin,
}) {
  const [motivo, setMotivo] = useState("Portes");
  const [valor, setValor] = useState();
  const coste = {
    motivo,
    valor,
  };
  function agregarcostes_fin() {
    if (isNaN(coste.valor)) {
      console.log("El campo de valor es requerido");
      return;
    } else {
      costes_fin.push(coste);
      setCostes_fin(costes_fin);
      total_cg_fin = Number(total_cg_fin) + Number(coste.valor);
      setTotal_cg_fin(total_cg_fin);
      setMotivo("Portes");
      setValor("");
      return;
    }
  }
  function cancel() {
    setMotivo("Portes");
    setValor("");
  }
  return (
    <div className="table-costes-fin">
      <h5> Costes / Gastos Finales </h5>
      <div className="two-columns">
        <div className="inputs">
          <div className="input-data">
            <Label sm={2}>Motivo: </Label>
            <Input
              bsSize="sm"
              type="select"
              value={motivo}
              onChange={(e) => {
                setMotivo(e.target.value);
              }}
            >
              <option value="Portes" selected="">
                Portes
              </option>
              <option value="Gastos de administración">
                Gastos de administración
              </option>
              <option value="Otros gastos">Otros gastos</option>
            </Input>
          </div>
          <div className="input-data">
            <Label sm={4}>Valor expresado en: </Label>
            <Input
              bsSize="sm"
              value={valor}
              type="number"
              onChange={(e) => {
                setValor(e.target.value);
              }}
            ></Input>
          </div>
          <br></br>
          <Button outline color="primary" onClick={agregarcostes_fin}>
            Agregar
          </Button>{" "}
          <Button outline color="primary" onClick={cancel}>
            Cancelar
          </Button>{" "}
        </div>
        <div className="output">
          <ul>
            {costes_fin.map((coste) => (
              <li>
                [{coste.motivo}] | VALOR: {coste.valor}
                <button outline color="danger">
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <span>Total Costo / Gasto Final: {total_cg_fin}</span>
        </div>
      </div>
    </div>
  );
}

export default CostesFin;
