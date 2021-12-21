import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import "../../assets/css/adm.css"
import user from "../../assets/img/user.png"

export default function ConsultasAdm() {
    const [listaConsultas, setListaConsultas] = useState([]);

    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);

    const [idPaciente, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [idSituacao, setIdSituacao] = useState(0);
    const [dataConsulta, setDataConsulta] = useState(new Date());
    const [descricaoConsulta, setDescricaoConsulta] = useState("");


    function buscarMedicos() {
        axios("http://localhost:5000/api/Medicos", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMedicos(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarMedicos, [])

    function buscarPacientes() {
        axios("http://localhost:5000/api/Pacientes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaPacientes(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarPacientes, []);

    function buscarConsultas() {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data);
                    // console.log(resposta.data)
                    // console.log(listaConsultas)
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarConsultas, []);

    function cadastrarConsultas(evento) {
        evento.preventDefault();
        axios.post("http://localhost:5000/api/Consultas", {
            idPaciente: idPaciente,
            idMedico: idMedico,
            idSituacao: idSituacao,
            dataConsulta: dataConsulta,
            descricaoConsulta: descricaoConsulta
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log("consulta cadastrada");
                    buscarConsultas();
                    setIdPaciente(0);
                    setIdMedico(0);
                    setIdSituacao(0);
                    setDataConsulta("");
                    setDescricaoConsulta("");
                }
            }).catch(erro => console.log(erro))
    }

    function permitirSelect(idConsulta) {
        // console.log("Você está editando a situação da consulta " + idConsulta + "e a situação é " + idSituacao)        
        document.getElementById(idConsulta).removeAttribute("disabled");
        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none") {
            btn.style.display = "";      
        } else{
            btn.style.display = "none";
        }
        

    }

    function atualizarSituacao(idConsulta){

        axios.patch("http://localhost:5000/api/consultas/" + idConsulta,{
            idSituacao: idSituacao
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta =>{
            if (resposta.status === 204) {
                console.log("consulta" + idConsulta + "atualizada");
                document.getElementById(idConsulta).setAttribute("disabled", "disabled");
                var btn = document.getElementById("btn" + idConsulta)
                
                btn.style.display = "none";
                buscarConsultas();
            }
        }).catch(erro => console.log(erro))
    }

    function abrirDescricao(idConsulta){
        //mesma coisa pra desalterar select, porém com a descrição display none ou não
        var textoDescricao = document.getElementById("texto_desc"+ idConsulta);
        if (textoDescricao.value === null || textoDescricao.value === "" || textoDescricao.value === undefined) {
            textoDescricao.value = "Consulta sem descrição";
            
        }

        if (textoDescricao.style.display === "none") {
            textoDescricao.style.display = "";
        } else{
            textoDescricao.style.display = "none";
        }
    }

    



    return (

        <>
            <Cabecalho />
            <main className="container-main">

                <section className="banner-adm">
                    <div className="container-banner">
                        <p className="texto-banner">A clinica SP Medical Group disponibiliza abaixo as consultas agendadas por você</p>
                    </div>
                </section>


                <section className="cadastrar-consulta">
                    <p className="titulo-section">CADASTRAR CONSULTA</p>
                    <form onSubmit={cadastrarConsultas} className="container-cadastrar-consulta">
                        <label className="label-cadastro" for="paciente">Paciente:</label>
                        <select className="input-cadastro" name="paciente" id="paciente" name="paciente" value={idPaciente} defaultValue="0" onChange={(campo) => setIdPaciente(campo.target.value)}>
                            <option value="0" disabled>Selecione o paciente</option>
                            {
                                listaPacientes.map((paciente) => {
                                    return (
                                        <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                            {paciente.nomePaciente}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    
                        <label class="label-cadastro" for="medico">Medico:</label>
                        <select class="input-cadastro" name="medico" id="medico" name="medico" value={idMedico} defaultValue={0} onChange={(campo) => setIdMedico(campo.target.value)}>
                            <option value="0" disabled> Selecione o Medico</option>
                            {
                                listaMedicos.map((medico) => {
                                    return (
                                        <option key={medico.idMedico} value={medico.idMedico}>
                                            {medico.nomeMedico + " " + medico.sobrenomeMedico}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    
                        <label className="label-cadastro" for="situacao">Situacao:</label>
                        <select className="input-cadastro" name="situacao" id="situacao" value={idSituacao} defaultValue="0" onChange={(campo) => setIdSituacao(campo.target.value)}>
                            <option  value="0" disabled>Selecione a situacao</option>
                            <option  value="1" >Agendada</option>
                            <option  value="2" >Realizada</option>
                            <option  value="3" >Cancelada</option>
                        </select>
                    
                        <label className="label-cadastro" for="data">Data da consulta</label>
                        <input className="input-cadastro" name="data" id="data" type="datetime-local" onChange={(campo) => setDataConsulta(campo.target.value)}/>
                    
                        <label className="label-cadastro" for="descricao">Descricao</label>
                        <input className="input-cadastro" name="descricao" id="descricao" type="text" onChange={(campo) => setDescricaoConsulta(campo.target.value)}/>
                                
                        <button className="btn-cadastro" type="submit">CADASTRAR</button>
                    </form>
                </section>


                <section class="cards">
                                    <p class="titulo-section">LISTAGEM DE CONSULTAS</p>

                    {
                        listaConsultas.map((consulta) => {
                            function verificaDescricao(desc) {
                                if (consulta.descricaoConsulta === null || consulta.descricaoConsulta === undefined || consulta.descricaoConsulta === "") {
                                    return "Nenhuma descrição adicionada pelo seu medico";
                                }else{
                                    return desc
                                }
                            }
                            // console.log(consulta.idSituacaoNavigation.situacao1)
                            return (
                                
                                    <div key={consulta.id} className="card-borda">
                                        <img className="user" src={user} alt="Foto Usuario"/>
                                        <div className="textos-card">
                                            <p className="dados"><span class="dados-titulo">Paciente:</span> {consulta.idPacienteNavigation.nomePaciente}</p>
                                            <p className="dados"><span class="dados-titulo">Medico:</span> {consulta.idMedicoNavigation.nomeMedico + " " + consulta.idMedicoNavigation.sobrenomeMedico}</p>
                                            <p className="dados"><span class="dados-titulo">Data:</span> {Intl.DateTimeFormat("pt-BR", {
                                                    year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                                }).format(new Date(consulta.dataConsulta))}</p>
                                            <p className="dados"><span class="dados-titulo">Descrição:</span> {verificaDescricao(consulta.descricaoConsulta)}</p>
                                            <p className="dados"><span class="dados-titulo">Situação:</span> {consulta.idSituacaoNavigation.situacao1} </p>
                                            
                                        </div>
                                    </div>
                                

                            )

                        })
                    }
                    </section>
            </main>

            <Rodape />


        </>
    )
}