import React from "react";
import { DataGrid } from "@material-ui/data-grid";

function ClientesTable({ clientes }) {
  const columns = [
    { field: "ruc", headerName: "RUC", width: 160},
    { field: "razonSocial", headerName: "Razon Social", width: 330 },
    { field: "contacto", headerName: "Contacto", width: 200 },
    { field: "direccion", headerName: "Dirección", width: 200 },
    { field: "distrito", headerName: "Distrito", width: 180 }
  ];
  return (
    <div style={{ height: "94.5%", width: "100%", border: "none" }}>
      <DataGrid rows={clientes} columns={columns} autoPageSize={true}/>
    </div>
  );
}

export default ClientesTable;
