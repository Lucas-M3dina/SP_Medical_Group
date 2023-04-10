import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticado } from "../../services/auth";

import "../../assets/css/login.css";

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
                        
                        window.location.href = "/consultasAdm"
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case '2':
                        window.location.href = "/consultasMedico"
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case '3':
                        window.location.href = "/consultasPaciente"
                        console.log("estou logado: " + usuarioAutenticado())
                        break;
                
                    default:
                        window.location.href = "/"
                        break;
                }
            }
        }).catch( erro => console.log('erro'), setErroMensagem("credenciais inválidas"))

    }

    return(
        <div className="fundoLogin">

            <main className="login">
                <div className="container-login">
                    <div className="link-cadastro">
                        <h1>SP Medical Group</h1>
                        <p>Caso seja novo por aqui não perca tempo, cadastre-se e aproveite uma vida saudavel</p>
                        <Link className="btn-logar" to="/">cadastre-se</Link>
                    </div>
            
                    <div className="form-login">
                        <span className="titulo-login">LOGIN</span>
                        <form onSubmit={(e) => {EfetuaLogin(e)}}>
                            <input className="input-login" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            <input className="input-login" type="password" name="senha" id="senha" placeholder="Senha" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
                            <button className="btn-logar" type="submit">LOGIN</button>
                            <p>{erroMensagem}</p>
                        </form>
                    </div>
                </div>    
            </main>

        </div>
    )
}