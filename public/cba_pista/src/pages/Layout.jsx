

import { useState } from "react";
import { Outlet } from "react-router-dom";  // ← Agregar esta línea
import HeaderApp from "../components/header";
import Sidebar from "../components/Sidebar";
import BottomNavBar from "../components/BottomNavBar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <HeaderApp onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Outlet />  {/* Renderiza las rutas hijas */}
      <BottomNavBar />
    </>
  );
};

export default Layout;