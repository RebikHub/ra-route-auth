import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NetoForm({
  login,
  password,
  handleInputLogin,
  handleInputPassword,
  handleClickIn,
  done
}) {
  let navigate = useNavigate()
  return (
    <form className="form">
      <input 
        type="text"
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
      <button
        className="form-btn"
        onClick={async () => {
          await handleClickIn()
          if (done) {
            navigate("/ra-route-auth/news")
          }
          }}>Login</button>
    </form>
  )
}
