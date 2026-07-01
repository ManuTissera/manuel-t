

import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import "./App.css"
import "./Files_CSS/style.css"
import "./Files_CSS/header.css"
import "./Files_CSS/bottomNavBar.css"
import "./Files_CSS/buttons.css"
import "./Files_CSS/modales.css"
import "./Files_CSS/tables.css"
import "./Files_CSS/login.css"
import "./Files_CSS/profile.css"
// import "./Files_CSS/signup.css"
import "./Files_CSS/home.css"
// import "./Files_CSS/home2.css"
import "./Files_CSS/home3.css"
import "./Files_CSS/new_admin.css"
import "./Files_CSS/new_record.css"
import './Files_CSS/CreateAccount.css';

// import "./Files_CSS/add_pilots2.css"

import Layout from "./components/Layout.jsx"

import HeaderApp from "./components/header.jsx"
import Sidebar from "./components/Sidebar.jsx"
import BottomNavBar from "./components/BottomNavBar.jsx"

import MobileTable from "./pages/Mobile_records.jsx"
import CurrentRecord from "./pages/CurrentRecords.jsx";

import ModalLoadRecord from "./components/ModalLoadRecord.jsx";
import ProfileUser from "./pages/Profile.jsx";
import PilotsTable from "./pages/Pilots.jsx"
import CreateNewAdmin from "./pages/CreateAdmin.jsx"
import HomePage from "./pages/home.jsx"
import NewRecordForm from "./pages/NewRecord.jsx"
import AddPilotsElement from "./pages/AddPilots.jsx"

import CreateAccount from "./pages/CreateAccount.jsx";
import LogIn from "./pages/LogIn.jsx"
import Landing from "./pages/Landing.jsx"


export default function App() {

  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Rutas que NO deben tener Header ni BottomNavBar
  const noLayoutRoutes = ["/", "/login", "/signup"];
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {showLayout && <HeaderApp onMenuClick={() => setIsSidebarOpen(true)} />}
      {showLayout && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<ProfileUser/>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/sing_up" element={<CreateAccount />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pilots" element={<PilotsTable />} />
        <Route path="/new_admin" element={<CreateNewAdmin />} />
        <Route path="/add_pilot" element={<AddPilotsElement />} />
        <Route path="/current_record" element={<CurrentRecord/>} />
        <Route path="/records_tires" element={<MobileTable />} />
        <Route path="/new_record" element={<NewRecordForm />} />
        <Route path="/modal_load_record" element={<ModalLoadRecord />} />
      </Routes>
      
      {showLayout && <BottomNavBar />}
    </>
  );
};
    





