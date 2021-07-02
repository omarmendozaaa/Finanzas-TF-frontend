export function calcular(datos4analisis, moneda) {
  console.log(datos4analisis);
  const calcdias = () => {
    const fecha_emision = new Date(datos4analisis.fecha_emision);
    const fecha_pago = new Date(datos4analisis.fecha_pago);
    return fecha_pago.getTime() - fecha_emision.getTime();
  };

  const selectTipoMoneda = moneda;
  var inpPlazoDias = calcdias()/(1000*60*60*24);
  const selectTipoPlazoTasa = datos4analisis.plazo_tasa;
  const inpValorTasa = datos4analisis.tasa_efectiva;
  const inpValorNominal = datos4analisis.total_facturado;
  const inpRetencion = datos4analisis.retencion;
  const inpCGI = datos4analisis.total_cg_ini;
  const inpCGF = Number(datos4analisis.total_cg_fin);

  var tasaEfectivaDias,
    tasaDescontadaDias,
    descuento,
    valorNeto,
    valorRecibido,
    valorEntregado,
    TCEA;
  var valorNominal = Number(inpValorNominal);
  var CGF = Number(inpCGF);
  var CGI = Number(inpCGI);
  var retencion = Number(inpRetencion);
  var valorTasa = Number(inpValorTasa);

  tasaEfectivaDias =
    Math.pow(1 + valorTasa / 100, inpPlazoDias / selectTipoPlazoTasa) - 1;
  tasaDescontadaDias = tasaEfectivaDias / (1 + tasaEfectivaDias);
  descuento = inpValorNominal * tasaDescontadaDias; 
  valorNeto = inpValorNominal - descuento; 
  valorRecibido = valorNeto - CGI - retencion; 
  valorEntregado = valorNominal + CGF - retencion; 

  descuento = inpValorNominal * tasaDescontadaDias; 
  valorNeto = inpValorNominal - descuento; 
  valorRecibido = valorNeto - CGI - retencion; 
  valorEntregado = valorNominal + CGF - retencion; 
  
  TCEA = (Math.pow((valorEntregado/valorRecibido), (datos4analisis.dias_ano/inpPlazoDias)) - 1) * 100

  valorTasa = valorTasa.toFixed(6);
  valorNominal = valorNominal.toFixed(2);
  CGI = CGI.toFixed(2);
  CGF = CGF.toFixed(2);
  retencion = retencion.toFixed(2);
  descuento = descuento.toFixed(2);
  valorNeto = valorNeto.toFixed(2);
  valorRecibido = valorRecibido.toFixed(2);
  valorEntregado = valorEntregado.toFixed(2);
  TCEA = TCEA.toFixed(6);
  tasaDescontadaDias = tasaDescontadaDias.toFixed(6)
  var TipoMoneda = selectTipoMoneda;
  var FechaEmision = new Date(datos4analisis.fecha_emision).toISOString();
  var FechaPago =  new Date(datos4analisis.fecha_pago).toISOString();
  var PlazoDias = Number(inpPlazoDias.toFixed(0));
  var TipoPlazoTasa = selectTipoPlazoTasa;
  var ValorTasa = valorTasa;
  var ValorNominal = valorNominal;
  var CostoInicialTotal = CGI;
  var CostoFinalTotal = CGF;
  var Retencion = retencion;
  var Descuento = descuento;
  var ValorNeto = valorNeto;
  var ValorRecibido = valorRecibido;
  var ValorEntregado = valorEntregado;


  const carteraNueva = {
    TipoMoneda,
    FechaEmision,
    FechaPago,
    PlazoDias,
    TipoPlazoTasa,
    ValorTasa,
    ValorNominal,
    CostoInicialTotal,
    CostoFinalTotal,
    Retencion,
    Descuento,
    ValorNeto,
    ValorRecibido,
    ValorEntregado,
    TCEA,
    tasaDescontadaDias,
  };

  try {
    return carteraNueva;
  } catch (error) {
    console.log(error);
  }
}
