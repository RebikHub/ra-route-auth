import React, { useState } from "react";
import NetoForm from "./components/NetoForm";
import NetoHeader from "./components/NetoHeader";
import NetoList from "./components/NetoList";
import NetoLogout from "./components/NetoLogout";
import NetoPlug from "./components/NetoPlug";
import useFetchAuthorization from "./custom_hook/useFetchAuthorization";

export default function App() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [input, setInput] = useState(null)
  const [output, setOutput] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'))
  const [user, news] = useFetchAuthorization(input, output, token)

  function handleInputLogin(ev) {
    setLogin(ev.target.value)
  }

  function handleInputPassword(ev) {
    setPassword(ev.target.value)
  }

  function handleClickIn() {
    if (login !== '' && password !== '') {
      setInput({
        login: login, 
        password: password
      })
      setLogin('')
      setPassword('')
    }
  }

  function handleClickOut() {
    setOutput(true)
    setInput(null)
    setTimeout(() => setOutput(false), 2*1000)
  }

  return (
    <>
      <NetoHeader>
        {user === null ?
          <NetoForm
            login={login}
            password={password}
            handleInputLogin={handleInputLogin}
            handleInputPassword={handleInputPassword}
            handleClickIn={handleClickIn} /> :
          <NetoLogout
            user={user}
            handleClickOut={handleClickOut}/>}
      </NetoHeader>
      {news.length === 0 ? <NetoPlug/> : <NetoList news={news}/>}
    </>
  );
}
