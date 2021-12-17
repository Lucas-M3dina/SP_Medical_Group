import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticado } from "../../services/auth";

import "../../assets/css/login.css";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email: "administrador@gmail.com",
            senha: "123456",
            erroMensagem: "",
            isLoading: false
        }
    };

    EfetuaLogin = (evento) => {
        evento.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios.post("http://localhost:5000/api/Login", {
            email: this.state.email,
            senha: this.state.senha
        })

        .then(resposta => {
            if (resposta.status === 200) {

                localStorage.setItem("usuario-login", resposta.data.token);

                this.setState({ isLoading: false});

                switch (parseJWT().role) {
                    case "1":
                        this.props.history.push("/consultasAdm")
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case "2":
                        this.props.history.push("/consultasMedico")
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case "3":
                        this.props.history.push("/consultasPaciente")
                        console.log("estou logado: " + usuarioAutenticado())
                        break;
                
                    default:
                        this.props.history.push("/")
                        break;
                }
            }
        }).catch( erro => console.log(erro), this.setState({ erroMensagem: "credenciais inválidas"}))

    }

    AtualizaStateCampo = (campo) =>{
        this.setState({[campo.target.name]: campo.target.value })
    }

    render(){
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
                            <form onSubmit={this.EfetuaLogin}>
                                <input className="input-login" type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.AtualizaStateCampo}/>
                                <input className="input-login" type="password" name="senha" id="senha" placeholder="Senha" value={this.state.senha} onChange={this.AtualizaStateCampo}/>
                                <button className="btn-logar" type="submit">LOGIN</button>
                                <p>{this.state.erroMensagem}</p>
                            </form>
                        </div>
                    </div>    
                </main>

            </div>
        )
    }
}