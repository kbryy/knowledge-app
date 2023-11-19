import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreatePost from "./components/CreatePost";
import "./App.css";
import Footer from "./components/Footer";
import Knowledge from "./components/Knowledge";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createPost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
