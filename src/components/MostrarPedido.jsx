/* eslint-disable react/prop-types */

function MostrarPedido({ p }) {
  return (
    <>
        <p>{p.nombreProducto} : {p.cantidad}</p>
    </>
  )
}

export default MostrarPedido