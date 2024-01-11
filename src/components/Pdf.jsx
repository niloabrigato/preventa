/* eslint-disable react/prop-types */
import {
    Document,
    Text,
    Page,
    StyleSheet
} from '@react-pdf/renderer'
import { formatoFecha } from '../utils/functions.jsx'


function Pdf({ pedidos }) {
    console.log(pedidos)
  return (
    <Document>
        <Page>
            {
                pedidos.map(p => (
                <div key={p.cliente}>
                    <Text>{p.cliente}</Text>
                    <Text>{formatoFecha.format(p.fecha)}</Text>
                    {
                        p.pedido.map(orden => <Text
                            key={orden.nombreProducto}
                        >{orden.nombreProducto} cantidad: {orden.cantidad}</Text>)
                    }
                    <Text>---------------------</Text>
                </div>))
            }
            
            
                
        </Page>
    </Document>
  )
}

export default Pdf