import React from 'react'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom';
import User from '../../assets/img/user.png'
import './cabecalho.css'


export default function Cabecalho() {


    return (
        <header>
            <div className="container-header">
                <div className="container-logo">
                    <Link to="/home"> <img className="logo" src={logo} alt="Logo"/> </Link>
                </div>

                <nav className="nav-header">
                    <Link className='text-header' to='#localizacao'>LOCALIZAÇÃO</Link>
                    <Link className='text-header' to='#localizacao'>CONSULTAS</Link>
                    <Link className='text-header' to='#localizacao'>QUEM SOMOS</Link>
                    <div className="container-user">
                        <img src={User} className='user-img' alt="Usuario"/>
                    </div>
                </nav>
            </div>
        </header>
    )
}