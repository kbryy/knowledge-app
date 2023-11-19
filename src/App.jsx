import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '~/containers/Home/Home'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import Login from '~/components/Login'
import Logout from '~/components/Logout'
import Knowledge from '~/containers/Knowledge/Knowledge'
import './App.css'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') || false)
  console.log(Home)

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
