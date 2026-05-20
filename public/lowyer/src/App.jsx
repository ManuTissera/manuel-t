


import { useState } from 'react'

import { Routes, Route } from "react-router-dom"


import Home from './pages/home'
import HomeOrange from './pages/home_orange'

import './App.css'
import './File_CSS/home.css'
import './File_CSS/home_orange.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orange_home" element={<HomeOrange />} />
      </Routes>
    </>
  )
}

export default App
