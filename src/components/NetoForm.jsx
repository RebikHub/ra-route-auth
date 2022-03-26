import React from 'react'
import { Link } from 'react-router-dom'

export default function NetoForm({login, password, handleInputLogin, handleInputPassword, handleClickIn}) {
  return (
    <form className="form">
      <input 
        type="login"
        className="input-name"
        placeholder="Username"
        required
        value={login}
        onChange={handleInputLogin}/>
      <input
        type="password"
        className="input-password"
        placeholder="Password"
        required
        value={password}
        onChange={handleInputPassword}/>
      <Link
        to={'/news'}
        className="form-btn"
        onClick={handleClickIn}>Login</Link>
    </form>
  )
}
