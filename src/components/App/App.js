
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../Garantie/Garantie';
import Login from '../Login/Login';
import Nomenclatures from '../Nomenclatures/Nomenclatures'
import Preferences from '../Preferences/Preferences';
import Home from '../Home/Home';
import useToken from './useToken';
import Menu from "../Menu/Menu"
import './App.css';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <Menu/>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home/>} ></Route>
            <Route path="/Home" element={<Home/>} ></Route>
            <Route path="/Nomenclatures" element={<Nomenclatures/>} ></Route>
            <Route path="/Preferences" element={<Preferences/>} ></Route>
			      <Route path="/Garantie" element={!token ? <Navigate to="/Login" replace /> :  <Dashboard />}>
          </Route>

          </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;