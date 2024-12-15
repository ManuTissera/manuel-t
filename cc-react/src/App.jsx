
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect} from 'react'
import './App.css'
import LinkAside from './components/links-aside.jsx'
import StructureTable from './components/table.jsx'
import EditPage from './components/EditPage.jsx'
import Layout from './components/Layout.jsx'
import InicioFn from './components/Inicio.jsx'
import StructureAdd from './components/AddElement.jsx'
import LoginStructure from './components/login.jsx'

function App() {

  let URLhost = (window.location.hostname === 'localhost')?'http://localhost:3111':''

  const hrefPage  = ['Inicio','Proveedores','Compras','Gastos','Cajas','Clientes','Personal']

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<LoginStructure/>}/>
        { /* Principal Route */ }
        <Route path="/inicio" element={<Layout><InicioFn/></Layout>}/>
        { /* Table Route */ }
        <Route path="/table/:tableName"  
               element={<Layout>
                          <StructureTable/>
                        </Layout>}/>
        { /* ------- Edition ------ */}
        <Route path="/edit/:tableName/:id_column/:id" element={<EditPage/>} />
        <Route path="/table/add/:tableName" element={<StructureAdd/>} />
      </Routes>
    </Router>
  )
}

export default App
