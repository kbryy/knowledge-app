import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '~/firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate()
  const loginInWithGoogle = () => {
    //Googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      localStorage.setItem('isAuth', true)
      setIsAuth(true)
      navigate('/')
    })
  }
  return (
    <div className="main">
      <p>ログインして始める</p>
      <button onClick={loginInWithGoogle}>Googleでログイン</button>
    </div>
  )
}

Login.propTypes = {
  setIsAuth: PropTypes.func.isRequired,
}

export default Login
