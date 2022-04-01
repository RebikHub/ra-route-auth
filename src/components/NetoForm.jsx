import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NetoForm({
  login,
  password,
  handleInputLogin,
  handleInputPassword,
  handleClickIn
}) {
  let navigate = useNavigate();

  function getToken() {
    if (login !== "" && password !== "") {
      setTimeout(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
          navigate("/news");
        };
      }, 2000);
    };
  };

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
        onClick={(ev) => {
          handleClickIn(ev)
          getToken()
          }}>Login</button>
    </form>
  );
};
