import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Label,
  Input,
  ModalHeader,
  ModalFooter,
  Alert,
} from "reactstrap";

function ClientesModal({getclientes}) {
  const [ruc, setRuc] = useState(null);
  const [razonSocial, setRazonSocial] = useState(null);
  const [contacto, setContacto] = useState(null);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const cliente = {
    ruc,
    razonSocial,
    contacto,
  };

  const toggle = () => {
    setModal(!modal);
    setRuc("");
    setRazonSocial("");
    setContacto("");
    setAlert(false);
  };

  async function agregarcliente() {
    try {
      await axios.post("https://localhost:5001/api/Clientes", cliente);
      toggle();
      getclientes();
    } catch (error) {
      setAlert(true)
    }
  }
  return (
    <div>
      <Button color="primary" onClick={toggle}> 
        Agregar Cliente
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        {alert?<Alert color="danger"> Razon Social y el número de telefono son requeridos </Alert>:<Alert color="primary"></Alert>}
        <ModalHeader>Agregar Cliente</ModalHeader>
        <ModalBody>
          <Label for="ruc"> Por favor ingrese el RUC del cliente </Label>
          <Input
            value={ruc}
            type="text"
            name="ruc"
            placeholder="Ingresa el RUC"
            onChange={(e) => setRuc(e.target.value)}
          ></Input>
          <h3> </h3>
          <Label for="ruc">
            {" "}
            Por favor ingrese la Razon Social del Cliente{" "}
          </Label>
          <Input
            required
            type="text"
            name="razonSocial"
            placeholder="Ingresa Razon Social"
            onChange={(e) => setRazonSocial(e.target.value)}
          ></Input>
          <h3> </h3>
          <Label for="ruc"> Ingrese el contacto del cliente </Label>
          <Input
            required
            type="tel"
            name="contacto"
            placeholder="Número de teléfono del cliente"
            onChange={(e) => setContacto(e.target.value)}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={agregarcliente}>
            {" "}
            Agregar Cliente{" "}
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ClientesModal;
