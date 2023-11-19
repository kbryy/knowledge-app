import React from 'react'
import PropTypes from 'prop-types'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

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
  )
}

Navbar.propTypes = {
  isAuth: PropTypes.string.isRequired,
}

export default Navbar
