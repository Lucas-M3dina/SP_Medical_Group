import React from 'react'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom';


export default function Cabecalho() {


    return (
        <header>
            <Link to="/home"> <img className="logo" src={logo} alt="Logo"/> </Link>
        </header>
    )
}