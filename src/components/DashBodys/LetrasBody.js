import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import ClientesModal from "../FormsModal/ClientesModal";
import FacturaModal from "../FormsModal/FacturaModal";
import { DataGrid } from "@material-ui/data-grid";
import {
  Form,
  Label,
  Input,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import axios from "axios";
import CostesIni from "../Costes/CostesIni";
import CostesFin from "../Costes/CostesFin";
function LetrasBody({ showError, logout, user }) {
  // eslint-disable-next-line
  const [isdolar, setIsdolar] = useState(false);
  //######################################## FACTURA DATOS  ###############################################################
  const [fecha_emision, setFecha_emision] = useState(Date);
  const [fecha_pago, setFecha_pago] = useState(Date);
  const [total_facturado, setTotal_facturado] = useState();
  const [retencion, setRetencion] = useState();
  const [clienteid, setClienteid] = useState();
  const carteraId = user.carteraId;
  //######################################## TASA DATOS  ##################################################################
  const [dias_ano, setDias_ano] = useState(360);
  const [plazo_tasa, setPlazo_tasa] = useState(360);
  const [tasa_efectiva, setTasa_efectiva] = useState();
  const [fecha_descuento, setFecha_descuento] = useState();
  //######################################## ANALISIS DATOS  ###############################################################
  // eslint-disable-next-line
  const [analisis, setAnalisis] = useState({
    te_anual: 0,
    num_dias: 0,
    tefectiva: 0,
    tasadescontada: 0,
    descuento: 0,
    retencion: 0,
    costesiniciales: 0,
    valorneto: 0,
    valortotalrecibir: 0,
    costesfinales: 0,
    valortotalentregar: 0,
    tce_anual: 0,
  });
  const [total_cg_ini, setTotal_cg_ini] = useState(0);
  const [total_cg_fin, setTotal_cg_fin] = useState(0);
  const [costes_ini, setCostes_ini] = useState([]);
  const [costes_fin, setCostes_fin] = useState([]);
  //######################################## DEFINIR DATOS ###############################################################
  const costos_gastos = {
    total_cg_ini,
    total_cg_fin,
    costes_ini,
    costes_fin,
  };
  const tasa = {
    dias_ano,
    plazo_tasa,
    tasa_efectiva,
    fecha_descuento,
  };
  // eslint-disable-next-line
  const factura = {
    fecha_emision,
    fecha_pago,
    total_facturado,
    retencion,
    clienteid,
    carteraId,
    tasa,
    analisis,
    costos_gastos,
  };
  //######################################## OBTENER DATOS ###############################################################
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  //######################################## OTROS DATOS NECESARIOS ######################################################
    const columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "fecha_pago", headerName: "Fecha de Pago", width: 180 },
      {
        field: "valor_Nom",
        headerName: "Valor Nominal",
        width: 180,
      },
      { field: "retencion", headerName: "Retencion", width: 120 },
    ];
  //######################################## DATOS ANALISISSSSSSSS #######################################################
  const datos4analisis = {
    fecha_emision,
    fecha_pago,
    total_facturado,
    retencion,
    dias_ano,
    plazo_tasa,
    tasa_efectiva,
    fecha_descuento,
    total_cg_ini,
    total_cg_fin,
  };
  async function getclientes() {
    await axios
      .get("https://localhost:5001/api/Clientes/byuser")
      .then((res) => {
        console.log(res.data);
        setClientes(res.data);
        if(res.data[0] !== undefined){
          setClienteid(res.data[0].id)
        }
      });
  }
  async function getfacturas(id) {
    await axios
      .get(`https://localhost:5001/api/Letras/bycartera/${id}`)
      .then((res) => {
        console.log(res.data);
        setFacturas(res.data);
      });
  }
  useEffect(() => {
    getclientes();
    getfacturas(user.carteraId);
  }, [user.carteraId]);
  return (
    <div className="main-body">
      <Header showError={showError} logout={logout} />
      <div className="tittle">
        <span className="greeting">Hola {user.firstName},</span>
        <h2>Mis Letras</h2>
      </div>
      <div className="button-clients">
        <Col sm={4}>
          <FormGroup>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">@Cliente</InputGroupAddon>
              <Input
                required
                type="select"
                onChange={(e) => {
                  setClienteid(e.target.value);
                }}
              >
                {clientes.map((cliente) => (
                  <option value={cliente.id}>
                    {cliente.razonSocial} | RUC | {cliente.ruc} | NRO |{" "}
                    {cliente.contacto}
                  </option>
                ))}
              </Input>
            </InputGroup>
          </FormGroup>
        </Col>
        <div className="button-clients-2">
          <FormGroup>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">{isdolar?"$":"S/."}</InputGroupAddon>
              <Input
                required
                type="select"
                onChange={(e) => {
                  setIsdolar(e.target.value==="Soles"?false:true);
                }}
              >
                <option>Soles</option>
                <option>Dolares</option>
              </Input>
            </InputGroup>
          </FormGroup>
        </div>
        <div className="button-clients-2">
          <ClientesModal color="primary" getclientes={getclientes}>
            {" "}
            Agregar Cliente{" "}
          </ClientesModal>
        </div>
        <div className="button-clients-3">
          <FacturaModal
            datos4analisis={datos4analisis}
            tipo="Valor Nominal: "
            cartera_tipo="Letra"
            setAnalisis={setAnalisis}
            factura={factura}
            color="primary"
            simbolo={isdolar?"$":"S/."}
          >
          </FacturaModal>
        </div>
      </div>

      <div className="table-facturas">
        <div className="table">
          <div className="table-data">
            <div className="table-1">
              <h5> Datos de la Letra </h5>
              <Form>
                <div className="input-data">
                  <Label sm={5}>(FE) Fecha de Emisión: </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="date"
                    onChange={(e) => {
                      setFecha_emision(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="input-data">
                  <Label sm={5}>(FP) Fecha de Pago: </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="date"
                    onChange={(e) => {
                      setFecha_pago(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="input-data">
                  <Label sm={5}>(TF) Valor Nominal: </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="number"
                    onChange={(e) => {
                      setTotal_facturado(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="input-data">
                  <Label sm={5}>(R) Retencion: </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="number"
                    onChange={(e) => {
                      setRetencion(e.target.value);
                    }}
                  ></Input>
                </div>
              </Form>
            </div>
            <div className="table-2">
              <h5> Tasa y Plazo </h5>
              <Form>
                <div className="input-data">
                  <Label sm={5}>(DA) Días por año: </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="select"
                    onChange={(e) => {
                      setDias_ano(e.target.value);
                    }}
                  >
                    <option>360</option>
                    <option>365</option>
                  </Input>
                </div>
                <div className="input-data">
                  <Label sm={5}>(P) Plazo de Tasa: </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="select"
                    onChange={(e) => {
                      setPlazo_tasa(e.target.value);
                    }}
                  >
                    <option value="360">Anual</option>
                    <option value="180">Semestral</option>
                    <option value="120">Cuatrimestral</option>
                    <option value="90">Trimestral</option>
                    <option value="60">Bimestral</option>
                    <option value="30">Mensual</option>
                    <option value="15">Quincenal</option>
                    <option value="1">Diario</option>
                  </Input>
                </div>
                <div className="input-data">
                  <Label sm={5}>(TE) Tasa Efectiva en % : </Label>
                  <Input
                    required
                    bsSize="sm"
                    type="number"
                    onChange={(e) => {
                      setTasa_efectiva(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="input-data">
                  <Label sm={5}>(FD) Fecha de Descuento: </Label>
                  <Input
                    bsSize="sm"
                    type="date"
                    onChange={(e) => {
                      setFecha_descuento(e.target.value);
                    }}
                  ></Input>
                </div>
              </Form>
            </div>
          </div>
          <CostesIni
            setTotal_cg_ini={setTotal_cg_ini}
            setCostes_ini={setCostes_ini}
            total_cg_ini={total_cg_ini}
            costes_ini={costes_ini}
          ></CostesIni>
          <CostesFin
            setTotal_cg_fin={setTotal_cg_fin}
            setCostes_fin={setCostes_fin}
            total_cg_fin={total_cg_fin}
            costes_fin={costes_fin}
          ></CostesFin>
        </div>
        <div className="table-top">
          <div className="table-form">
            <h5> Mis Letras </h5>
            <div style={{ height: "94.5%", width: "100%", border: "none" }}>
              <DataGrid rows={facturas} columns={columns} autoPageSize={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetrasBody;
