import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticado } from "../../services/auth"; 
import LogoBanner from '../../assets/img/logoBanner.png'
import Logo from '../../assets/img/LogoLogin.png'

import "./login.css";

export default function Login(){
    const [email, setEmail] = useState('administrador@gmail.com')
    const [senha, setSenha] = useState('123456')
    const [erroMensagem, setErroMensagem] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    

    function EfetuaLogin(evento){
        evento.preventDefault();

        setErroMensagem('')
        setIsLoading(true)

        axios.post("http://localhost:5000/api/Login", {
            email: email,
            senha: senha
        })
        .then(resposta => {
            if (resposta.status === 200) {

                localStorage.setItem("usuario-login", resposta.data.token);

                setIsLoading(false)
                console.log(parseJWT().role);
                
                switch (parseJWT().role) {
                    case '1':
                        
                        window.location.href = "/adm"
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case '2' || '3':
                        window.location.href = "/consultas"
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    default:
                        window.location.href = "/"
                        break;
                }
            }
        }).catch( erro => setErroMensagem("Credenciais inválidas"))

    }

    return(
        <main className="login">
            <div className="container-img">
                <img src={LogoBanner} alt="Logo Banner"/>
                <div className="box-textos-login">
                    <p className="texto-banner-login">Crie sua conta na plataforma da nossa clínica médica agora e tenha acesso a seus agendamentos e resultados de exames!</p>
                    <p className="texto-banner-login">Não perca mais tempo, crie sua conta agora e tenha mais controle sobre a sua saúde!</p>
                </div>
                <Link className="btn-banner-login">Cadastre-se</Link>
            </div>

            <div className="container-form">
                <img src={Logo} alt="Logo" />
                <span className="texto-informativo-login">Se tiver uma conta basta preencher os dados de sua conta abaixo, caso o contrario cadastre uma conta.</span>
                <form className="formulario-login" onSubmit={(e) => {EfetuaLogin(e)}}>
                    <input className="input-login" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <input className="input-login" type="password" name="senha" id="senha" placeholder="Senha" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
                    <button className="btn-logar" type="submit">LOGIN</button>
                    <p>{erroMensagem}</p>
                </form> 
            </div>
        </main>
    )
}




