import MostrarPedido from "./MostrarPedido"
import { formatoFecha } from "../utils/functions.jsx"

/* eslint-disable react/prop-types */
function Pedido({pedido}) {
    const { cliente, fecha, pedido: pedidos } = pedido
    const fechaLatina = formatoFecha.format(fecha);


  return (
    <>
        <h2>{cliente}</h2>
        <p>{fechaLatina}</p>
        {
            pedidos.map(p => <MostrarPedido
                key={ p.nombreProducto }
                p = { p }    
            />)
        }
        
    </>
  )
}

export default Pedido