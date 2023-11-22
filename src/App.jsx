import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '~/containers/Home/Home'
import Login from '~/containers/Authentication/Login'
import Logout from '~/containers/Authentication/Logout'
import Knowledge from '~/containers/Knowledge/Knowledge'

import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

import './App.css'

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('isAuth') === 'true',
  )
  // console.log(isAuth)

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
