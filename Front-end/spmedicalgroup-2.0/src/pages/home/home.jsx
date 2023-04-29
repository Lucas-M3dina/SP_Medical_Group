import { Link } from 'react-router-dom';
import "./home.css";
import Cabecalho from "../../components/cabecalho/cabecalho";
import Rodape from "../../components/rodape/rodape";
import CardCoracao from "../../assets/img/coracao.png";
import CardBacteria from "../../assets/img/bacteria.png";
import CardGripe from "../../assets/img/gripe.png";
import Medicos from '../../assets/img/figura-medicos.png'
import { parseJWT} from "../../services/auth";
import { useEffect, useState } from 'react';

import Medicina from '../../assets/img/medicina-figura.png'
import Mapa from '../../assets/img/mapa.png'


export default function Home() {
    
    return (
        <>
            <Cabecalho />
            
            <main className="container-main">

                <section className="banner-home">
                    <div className="container-consulta">
                        <p className="texto-banner">A clinica SP Medical Group tem a missão de cuidar dos pacientes a partir de um tratamento completo e humanizado.</p>
                        <Link className="btn-consultas" to='consultas'>Consultas</Link>
                    </div>

                    <div className="container-animacao">
                        <img src={Medicina} alt="figura médico"/>
                    </div>
                </section>

                <section className="sobre">
                    <h2 className="titulo-sobre">Como vamos cuidar de você e da sua família?</h2>
                    <div className="container-sobre">
                        <div className="card card-desce">
                            <img className="imagem-card" src={CardCoracao} alt="Coração"/>
                            <p className="texto-card">A cardiologia atua na prevenção, diagnóstico e tratamento das doenças do coração.</p>
                        </div>

                        <div className="card">
                            <img className="imagem-card-bacteria" src={CardBacteria} alt="Bacteria"/>
                            <p className="texto-card">O Infectologista é o especialista que trata das doenças infecciosas e parasitárias que podem ser causadas por bactérias, fungos, vírus e demais microrganismos.</p>
                        </div>

                        <div className="card card-desce">
                            <img className="imagem-card" src={CardGripe} alt="Gripe"/>
                            <p className="texto-card">São profissionais que tratam todos os tipos de alergias, principalmente, as causadas por picada de inseto e comida.</p>
                        </div>
                    </div>
                </section>

                <section className="nos">
                    <div className="container-nos">
                        <div className="box-textos-nos">
                            <h2 className="nos-titulo">SOBRE NÓS</h2>
                            <p className="nos-texto">Fundada em 1988, a Clínica SP Medical Group é pioneira no atendimento médico acessível e está em constante evolução para cuidar e resolver as necessidades de saúde de seus pacientes</p>
                        </div>
                        <img src={Medicos} alt="Figura Médicos"/>
                    </div>
                </section>

                <section className="mapa">
                    <div className="container-mapa">
                        <div className="mapa-localizacao">
                            <div className="box-textos-localizacao">
                                <img src={Mapa} alt="Logo mapa"/>
                                <h2 className="mapa-titulo">Localização</h2>
                                <p className="mapa-endereco"> São Paulo/SP - CEP 01202-001 - Al. Barão de Limeira, 539 - Santa Cecília </p>
                            </div>
                            <iframe className="mapa-google" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8905833510266!2d-46.64839228502264!3d-23.536437484695305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5843deb99025%3A0xb23619858bc7e63e!2sEscola%20SENAI%20de%20Inform%C3%A1tica!5e0!3m2!1spt-BR!2sbr!4v1639522285063!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </section>

            </main>

            <Rodape />

        </>
    )
}