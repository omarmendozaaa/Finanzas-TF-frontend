import axios from "axios";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { calcular } from "../../Helpers/calc";
function FacturaModal({
  datos4analisis,
  moneda,
  tipo,
  cartera_tipo,
  setAnalisis,
  factura,
}) {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef = useRef();
  const toggle = () => {
    setModal(!modal);
  };
  function getresumen() {
    setData(calcular(datos4analisis, moneda));
    setAnalisis({
      te_anual: 0,
      num_dias: data.PlazoDias,
      tefectiva: data.ValorTasa,
      tasadescontada: data.tasaDescontadaDias,
      descuento: data.Descuento,
      retencion: data.Retencion,
      costesiniciales: data.CostoInicialTotal,
      valorneto: data.ValorNeto,
      valortotalrecibir: data.ValorRecibido,
      costesfinales: data.CostoFinalTotal,
      valortotalentregar: data.ValorEntregado,
      tce_anual: data.TCEA,
    });
    console.log(data);
    toggle();
  }
  async function postfacturas() {
    try{
      factura.fecha_emision = data.FechaEmision;
      factura.fecha_pago = data.FechaPago;
      console.log(factura)
      await axios.post("https://localhost:5001/api/Facturas",factura).then((res)=>{
        console.log(res.data)
      })
    }catch(error){
      console.log(error);
    }

  }
  async function postletras() {
    try{
      factura.fecha_emision = data.FechaEmision;
      factura.fecha_pago = data.FechaPago;
      await axios.post("https://localhost:5001/api/Letras",factura).then((res)=>{
        console.log(res.data)
      })
    }catch(error){
      console.log(error);
    }

  }
  async function postrecibos() {
    try{
      factura.fecha_emision = data.FechaEmision;
      factura.fecha_pago = data.FechaPago;
      await axios.post("https://localhost:5001/api/Recibos",factura).then((res)=>{
        console.log(res.data)
      })
    }catch(error){
      console.log(error);
    }

  }
  async function postdata() {
    switch (cartera_tipo) {
      case "Factura":
        postfacturas();
        break;
      case "Letra":
        postletras();
        break;
      case "Recibo":
        postrecibos();
        break;
      default:
        break;
    }
    toggle();
  }
  return (
    <div className="factura-modal">
      <Button color="primary" onClick={getresumen}>
        Agregar {cartera_tipo}
      </Button>
      <Modal isOpen={modal} toggle={toggle} ref={componentRef}>
        <ModalHeader>Resultado</ModalHeader>
        <ModalBody>
          <div className="modal-centered">
            <h1 class="textMin"> Resumen: {cartera_tipo}</h1>
            <p>
              <span class="textMin">{moneda}</span>
            </p>
            <hr></hr>
            <p class="textMin">Fecha Emision: {data.FechaEmision}</p>
            <p class="textMin">Fecha Pago: {data.FechaPago}</p>
            <hr></hr>
            <p class="textMin">
              {tipo}
              {data.ValorNominal}
            </p>
            <p class="textMin">
              Costos y Gastos Iniciales: {data.CostoInicialTotal}
            </p>
            <p class="textMin">
              Costos y Gastos Finales: {data.CostoFinalTotal}
            </p>
            <hr></hr>
            <p class="textMin">Plazo de Tasa: {data.PlazoDias} </p>
            <p class="textMin">Valor de Tasa: {data.ValorTasa}%</p>
            <hr></hr>
            <p class="textMin">Descuento: {data.Descuento}</p>
            <p class="textMin">Valor Neto: {data.ValorNeto} </p>
            <p class="textMin">Valor Recibido: {data.ValorRecibido}</p>
            <p class="textMin">Valor Entregado: {data.ValorEntregado}</p>
            <p class="textMin">TCEA: {data.TCEA} %</p>
            <br></br>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePrint}>
            🖨
          </Button>
          <Button color="primary" onClick={postdata}>
            Agregar
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FacturaModal;
