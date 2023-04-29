import React from 'react'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom';
import User from '../../assets/img/user.png'
import Sair from '../../assets/img/icon-sair.png'
import './cabecalho.css'


export default function Cabecalho() {

    const mostrarMenu = () => {
        var menu = document.querySelector('.tab-bar');
        
        menu.style.display == 'flex' ? menu.style.display = 'none' : menu.style.display = 'flex'
    }


    return (
        <header>
            <div className="container-header">
                <div className="container-logo">
                    <Link to="/home"> <img className="logo" src={logo} alt="Logo"/> </Link>
                </div>

                <nav className="nav-header">
                    <Link className='text-header' to='#'>LOCALIZAÇÃO</Link>
                    <Link className='text-header' to='#'>CONSULTAS</Link>
                    <Link className='text-header' to='#'>QUEM SOMOS</Link>
                    <div onClick={() => {mostrarMenu()}} className="container-user">
                        <img src={User} className='user-img' alt="Usuario"/>
                    </div>

                    <div className="tab-bar">
                        <span className="boasvindas borda">Bem vindo Lucas !</span>
                        <Link className='texto-tab-bar borda-tabbar' to='#'>PERFIL</Link>
                        <Link className='texto-tab-bar borda-tabbar' to='#'>CONSULTAS</Link>
                        <Link className='texto-sair-header' to='#'>SAIR <img src={Sair} alt="Icon para sair"/></Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}