import { useState } from 'react'

import './App.css'
import * as XLSX from 'xlsx'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ListaClientes from './components/ListaClientes'
import ListaProductos from './components/ListaProductos'
import Pedido from './components/Pedido'
import Pdf from './components/Pdf'
import { formatoFecha } from './utils/functions'

function App() {
  const [clienteactivo, setClienteactivo] = useState(null)
  const [pedidos, setPedidos] = useState([])
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  // submit state
  // const [excelData, setExcelData] = useState(null);

  const [productos, setProductos] = useState([])

  const [clientes, setClientes] = useState([])

    const handleFile=(e)=>{
      let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
      let selectedFile = e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fileTypes.includes(selectedFile.type)){
          setTypeError(null);
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload=(e)=>{
            setExcelFile(e.target.result);
          }
        }
        else{
          setTypeError('Please select only excel file types');
          setExcelFile(null);
        }
      }
      else{
        console.log('Please select your file');
      }
    }
    
    // submit event
    const handleFileProductos=(e)=>{
      e.preventDefault();
      if(excelFile!==null){
        const workbook = XLSX.read(excelFile,{type: 'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data.length)

        // setExcelData(data.slice(0,10));
        setProductos(data.slice(0,data.length));
      }
    }
    const handleFileClientes=(e)=>{
      e.preventDefault();
      if(excelFile!==null){
        const workbook = XLSX.read(excelFile,{type: 'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data.length)
        // setExcelData(data.slice(0,10));
        setClientes(data.slice(0,data.length));
      }
    }

  return (
    <>
     <h1>Preventa</h1>

     {/* Formulario productos */}
     { (productos.length === 0)  && <form onSubmit={handleFileProductos}>
        <input type="file" required onChange={handleFile} />
        <button type="submit" >Subir Productos</button>
        {typeError&&(
          <div >{typeError}</div>
        )}
      </form> }

     {/* Formulario clientes */}
     {(clientes.length === 0) && 
      <form onSubmit={handleFileClientes}>
      <input type="file" required onChange={handleFile} />
      <button type="submit" >Subir Clientes</button>
      {typeError&&(
        <div >{typeError}</div>
      )}
    </form>
     }

     {/* Listar clientes */}
     {
      !clienteactivo && <ListaClientes
      clientes={clientes}
      setClienteactivo={setClienteactivo}
     />
     }

{
      clienteactivo && <h2>{clienteactivo}</h2>
     }
     
     {/* Listar productos */}
     {
      clienteactivo && <ListaProductos
        clienteactivo={clienteactivo}
        productos={productos}
        pedidos={pedidos}
        clientes={clientes}
        setPedidos={setPedidos}
        setClienteactivo={setClienteactivo}
        setClientes={setClientes}

      />
    }
    
      {/* Listar pedidos */}
     {
      pedidos && pedidos.map(pedido => <Pedido
        key={pedido.cliente}
        pedido={pedido}  
      />)
     }

     {/* Descargar pdf */}
     <PDFDownloadLink
      document={<Pdf
        pedidos={pedidos}  
      />}
      fileName={`Pedidos-${formatoFecha.format(new Date())}.pdf`}
     >
      {
        ({loading}) => loading ? <button>Preparando PDF...</button> : <button>Descargar</button>
      }
     </PDFDownloadLink>

    </>
  )
}

export default App
