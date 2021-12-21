import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import user from "../../assets/img/user.png"

import "../../assets/css/medico.css"

export default function ConsultasMedico() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [descricao, setDescricao] = useState("");


    function buscarMinhasConsultas() {
        axios("http://localhost:5000/api/Consultas/Minhas", {
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

    useEffect(buscarMinhasConsultas, []);

    

    function atualizarDescricao(idConsulta){
        console.log(descricao + idConsulta)
        axios.patch("http://localhost:5000/api/Consultas/descricao/" + idConsulta,{
            descricaoConsulta: descricao
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta =>{
            if (resposta.status === 204) {
                console.log("descricao da consulta" + idConsulta + "atualizada");
                // document.getElementById(idConsulta).setAttribute("readOnly");
                var btn = document.getElementById("btn" + idConsulta)
                btn.style.display = "none";
                buscarMinhasConsultas();
                setDescricao("")
            }
        }).catch(erro => console.log(erro))
    }



    return (

        <>
            <Cabecalho />
            <main className="container-main">

                <section class="banner">
                    <div class="container-banner">
                        <p class="texto-banner">A clinica SP Medical Group disponibiliza abaixo suas consultas</p>
                    </div>
                </section>

                    {
                        listaConsultas.map((consulta) => {
                            function verificaDescricao(desc) {
                                if (consulta.descricaoConsulta === null || consulta.descricaoConsulta === undefined || consulta.descricaoConsulta === "") {
                                    return "Nenhuma descrição adicionada";
                                }else{
                                    return desc
                                }
                            }
                            // console.log(consulta.idSituacaoNavigation.situacao1)
                            return (
                                <section key={consulta.id} class="cards">
                                    <div class="card-borda">
                                        <img class="user" src={user} alt="Foto Usuario"/>
                                        <div class="textos-card">
                                            <p class="dados"><span class="dados-titulo">Paciente:</span> {consulta.idPacienteNavigation.nomePaciente}</p>
                                            <p class="dados"><span class="dados-titulo">Data:</span> {Intl.DateTimeFormat("pt-BR", {
                                                    year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                                }).format(new Date(consulta.dataConsulta))}</p>
                                            <p class="dados"><span class="dados-titulo">Descrição:</span>{verificaDescricao(consulta.descricaoConsulta)}</p>
                                            <p class="dados"><span class="dados-titulo">Situação:</span> {consulta.idSituacaoNavigation.situacao1} </p>
                                            
                                        </div>
                                    </div>
                                </section>

                            )

                        })
                    }

            </main>

            <Rodape />


        </>
    )
}