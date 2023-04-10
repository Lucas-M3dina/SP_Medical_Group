import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';

import './index.css';

import Home from './pages/home/home.jsx';
import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound';
import Medico from './pages/consultas/consultasMedico';
import Paciente from './pages/consultas/consultasPaciente';
import Adm from './pages/consultas/consultasAdm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/notFound" element={<NotFound/>}></Route>
        <Route path="/consultasPaciente" element={<Paciente/>}></Route>
        <Route path="/consultasMedico" element={<Medico/>}></Route>
        <Route path="/consultasAdm" element={<Adm/>}></Route>
      </Routes>
  </Router>
);

