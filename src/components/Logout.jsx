import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logout = () => {
    //ログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div className="main">
      <p>ログアウト</p>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default Logout;
