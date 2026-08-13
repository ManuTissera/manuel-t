


import { useState } from 'react'

import { Routes, Route } from "react-router-dom"


import Home from './pages/home'
import HomeOne from './pages/HomeOne.jsx'
import AboutUs from './pages/AboutUs.jsx'
import HomeOrange from './pages/home_orange'

import './App.css'
// import './File_CSS/home.css'
import './File_CSS/HomeOne.css';
import "./File_CSS/about_us.css";
// import './File_CSS/home_orange.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home_01" element={<HomeOne />} />
        <Route path="/about_us" element={<AboutUs />} />
        {/* <Route path="/orange_home" element={<HomeOrange />} /> */}
      </Routes>
    </>
  )
}

export default App
