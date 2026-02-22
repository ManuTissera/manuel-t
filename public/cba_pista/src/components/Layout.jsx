

import { useState } from "react"
import { Outlet } from "react-router-dom"

import HeaderApp from "./header.jsx"
import Sidebar from "./Sidebar.jsx"

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <HeaderApp onMenuClick={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="page">
        <Outlet />
      </main>
    </>
  )
}