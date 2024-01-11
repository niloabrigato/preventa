/* eslint-disable react/prop-types */

import { useState } from "react"

function ListaProductos({productos, clienteactivo, pedidos, clientes, setPedidos, setClienteactivo, setClientes }) {

    /** ListaProductos maneja
     * pedidosconfirmar
     */
    const [pedidosconfirmar, setPedidosconfirmar] = useState(null)
    const misPedidos = [] // array auxiliar
    
    /** recupero la información de los formularios */
    const handleSubmit = e => {
        e.preventDefault()
        const formData =  new FormData(e.target)
        const productosPreventa = Object.fromEntries(formData)

        
        var claves = Object.keys(productosPreventa);
        

        // armo los pedidos a confirmar
        for (var i = 0; i < claves.length; i++) {
            var clave = claves[i];
            if(productosPreventa[clave] > 0){
                const pedidoConfirmar = {
                    nombreProducto: clave,
                    cantidad: productosPreventa[clave]
                }
                misPedidos.push(pedidoConfirmar)
            }
        }
        setPedidosconfirmar(misPedidos)
    }

    /** confirmación del pedido */
    const seConfirmo = () => {
        // Armo un objeto con el pedido
        const pedidoConfirmado = {
            fecha: new Date(),
            cliente: clienteactivo,
            pedido: pedidosconfirmar
        }
        // seteo el pedido
        setPedidos([...pedidos, pedidoConfirmado])

        /** reseteo los estados */
        // ya esta confirmado el pedido
        setPedidosconfirmar(null)

        // ya no hay cliente activo
        setClienteactivo(null)

        // quito los clientes que ya pidieron
        const clientesRestantes = clientes.filter(cliente => cliente.nombre !== clienteactivo )
        setClientes(clientesRestantes)    
    }

    /** cancelo la agregación y debe resetear el formulario y variables */
    const canceloAgregar = () => {
        const formulario = document.getElementById('formulario')
        formulario.reset()
        setClienteactivo(null)
    }

  return (
    <form
        onSubmit={handleSubmit}
        id="formulario"
    >
    {
        productos.map(producto => (
            <div key={producto.nombre}>
                <label htmlFor="producto">{`${producto.nombre}: `}</label>
                <input type="number" name={producto.nombre} id={producto.nombre} />
            </div>
        ))
    }
    <button type="submit">Agregar</button>
    <button onClick={canceloAgregar}>Cancelar</button>
    <div>
        {
            pedidosconfirmar && <h2>Confirmación</h2>
        }
        
        {
            pedidosconfirmar && pedidosconfirmar.map(ped => <p
                key={ped.nombreProducto}
            >{`${ped.nombreProducto} - ${ped.cantidad}`}</p>)
        }
        {
            pedidosconfirmar && 
            <>
                <button onClick={seConfirmo}>Confirma ?</button>
                <button onClick={canceloAgregar}>Cancelar</button>
            </>
        }
        
    </div>    
    </form>
  )
}

export default ListaProductos


