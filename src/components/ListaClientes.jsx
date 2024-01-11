/* eslint-disable react/prop-types */

function ListaClientes({clientes, setClienteactivo}) {
  return (
    <>
        {
            clientes && clientes.map(cliente => <button
                key={cliente.nombre}
                onClick={ () => setClienteactivo(cliente.nombre)}
            >{cliente.nombre}</button>)
        }
    </>)
}

export default ListaClientes