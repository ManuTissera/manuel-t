import { Routes, Route } from "react-router-dom"

import "./App.css"
import "./Files_CSS/style.css"
import "./Files_CSS/header.css"
import "./Files_CSS/buttons.css"
import "./Files_CSS/modales.css"
import "./Files_CSS/tables.css"
import "./Files_CSS/login.css"
import "./Files_CSS/home.css"
import "./Files_CSS/new_record.css"

import Layout from "./components/Layout.jsx"

import PilotsTable from "./pages/Pilots.jsx"
import RecordTabel from "./pages/RecordsTable.jsx"
import MobileTable from "./pages/Mobile_records.jsx"
import HomePage from "./pages/Home.jsx"
import NewRecordForm from "./pages/NewRecord.jsx"
import AddPilotsElement from "./pages/AddPilots.jsx"
import LogIn from "./pages/LogIn.jsx"

export default function App() {
  return (
    <Routes>

      {/* SIN Header */}
      <Route path="/login" element={<LogIn />} />

      {/* CON Header */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pilots" element={<PilotsTable />} />
        <Route path="/records_table" element={<RecordTabel />} />
        <Route path="/add_pilot" element={<AddPilotsElement />} />
        <Route path="/records_tires" element={<MobileTable />} />
        <Route path="/new_record" element={<NewRecordForm />} />
        {/* si querés usar RecordsTires en alguna ruta, agregala acá */}
        {/* <Route path="/records" element={<RecordsTires />} /> */}
      </Route>

    </Routes>
  )
}