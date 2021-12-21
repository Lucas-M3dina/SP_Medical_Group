import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"

import user from "../../assets/img/user.png"

import "../../assets/css/paciente.css"

export default function ConsultasPaciente() {
    const [listaConsultas, setListaConsultas] = useState([]);


    function buscarMinhasConsultas() {
        axios("http://localhost:5000/api/Consultas/Minhas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarMinhasConsultas, []);

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

                <section className="banner">
                    <div className="container-banner">
                        <p className="texto-banner">A clinica SP Medical Group disponibiliza abaixo as consultas agendadas por você</p>
                    </div>
                </section>

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
                                <section key={consulta.id} class="cards">
                                    <div class="card-borda">
                                        <img class="user" src={user} alt="Foto Usuario"/>
                                        <div class="textos-card">
                                            <p class="dados"><span class="dados-titulo">Medico:</span> {consulta.idMedicoNavigation.nomeMedico + " " + consulta.idMedicoNavigation.sobrenomeMedico}</p>
                                            <p class="dados"><span class="dados-titulo">Data:</span> {Intl.DateTimeFormat("pt-BR", {
                                                    year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                                }).format(new Date(consulta.dataConsulta))}</p>
                                            <p class="dados"><span class="dados-titulo">Descrição:</span> {verificaDescricao(consulta.descricaoConsulta)}</p>
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