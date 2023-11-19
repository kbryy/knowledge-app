import "./Navbar.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFilePen,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = ({ isAuth }) => {
  return (
    <nav>
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} />
        ホーム
      </Link>
      {!isAuth ? (
        <>
          <Link to="/login">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            ログイン
          </Link>
        </>
      ) : (
        <>
          <Link to="/logout">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            ログアウト
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
