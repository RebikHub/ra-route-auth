import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NetoForm from "./components/NetoForm";
import NetoHeader from "./components/NetoHeader";
import NetoList from "./components/NetoList";
import NetoLogout from "./components/NetoLogout";
import NetoPlug from "./components/NetoPlug";
import NetoError from "./components/NetoError";
import NetoNews from "./components/NetoNews";
import useFetchAuthorization from "./custom_hook/useFetchAuthorization";

export default function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState(false);
  const [newsid, setNewsid] = useState(null);
  const token = JSON.parse(localStorage.getItem('token'));
  const [user, news, error, newsOne] = useFetchAuthorization(input, output, token, newsid);
  const [done, setDone] = useState(false);

  function handleInputLogin(ev) {
    setLogin(ev.target.value);
  };

  function handleInputPassword(ev) {
    setPassword(ev.target.value);
  };

  function handleClickIn(ev) {
    if (login !== '' && password !== '') {
      setInput({
        login: login, 
        password: password
      });
      ev.preventDefault();
      setLogin('');
      setPassword('');
    };
  };

  useEffect(() => {
    if (error === 'Not Found First Value') {
      setDone(false);
    } else if (error === 'user not found' || error === '401 Unauthorized') {
      setDone(true);
    };
  }, [error, done, input]);

  function handleClickOut() {
    setOutput(true);
    setInput(null);
    setTimeout(() => setOutput(false), 2*1000);
  };

  function checkId(id) {
    setNewsid(id);
  };

  if (done) {
    return (
      <>
        <NetoHeader>
          <NetoForm
            login={login}
            password={password}
            handleInputLogin={handleInputLogin}
            handleInputPassword={handleInputPassword}
            handleClickIn={handleClickIn}/>
        </NetoHeader>
        <NetoError error={error}/>
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NetoHeader>
            <NetoForm
              login={login}
              password={password}
              handleInputLogin={handleInputLogin}
              handleInputPassword={handleInputPassword}
              handleClickIn={handleClickIn}/>
          </NetoHeader>
          <NetoPlug/>
        </>
      }/>
      <Route path="/news" element={user !== null ? (
          <>
            <NetoHeader>
              <NetoLogout
                user={user}
                handleClickOut={handleClickOut}/>
            </NetoHeader>
            <NetoList news={news} checkId={checkId}/>
          </>
          ) : (token ? <progress/> : <NetoError error={error}/>)
        }/>
      <Route path="/news/:newsId" element={user !== null ? (
          <>
            <NetoHeader>
              <NetoLogout
                user={user}
                handleClickOut={handleClickOut}/>
            </NetoHeader>
            <NetoNews news={newsOne} checkId={checkId}/>
          </>
          ) : <progress/>
      }/>
      <Route path="*" element={<NetoError error={error}/>}/>
    </Routes>
  );
};
