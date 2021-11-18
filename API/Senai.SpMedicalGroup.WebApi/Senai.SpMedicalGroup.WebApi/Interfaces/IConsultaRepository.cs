using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    /// <summary>
    /// Interface responsável pelo InscricaooRepository
    /// </summary>
    interface IConsultaRepository
    {
        /// <summary>
        /// Listar todas as cosultas
        /// </summary>
        /// <returns>Lista com todas as consultas</returns>
        List<Consulta> ListarTodas();

        /// <summary>
        /// Buscar uma consulta pelo id
        /// </summary>
        /// <param name="idConsulta">id da consulta a ser procurada</param>
        /// <returns>Consulta encontrada</returns>
        Consulta BuscarPorId(int idConsulta);

        /// <summary>
        /// Cria uma nova consulta
        /// </summary>
        /// <param name="novaConsulta">Objeto consulta com os atributos a serem cadastrados</param>
        void Cadastrar(Consulta novaConsulta);

        /// <summary>
        /// Atualiza uma Consulta pelo id
        /// </summary>
        /// <param name="idConsulta">Id da consulta a ser atualizada</param>
        /// <param name="consultaAtualizada">objeto com atributos a serem atuzalizados da consulta</param>
        void Atualizar(int idConsulta, Consulta consultaAtualizada);

        /// <summary>
        /// Exclui uma consulta
        /// </summary>
        /// <param name="idConsulta">id da consulta a ser excluida</param>
        void Deletar(int idConsulta);

        /// <summary>
        /// Lista todos os eventos de um determinado usuário
        /// </summary>
        /// <param name="idUsuario">Id do usuário que participa dos eventos</param>
        /// <returns>Uma lista de presenças com os dados dos eventos</returns>
        List<Consulta> ListarMinhas(int idUsuario);

        
        /// <summary>
        /// Adiciona descrição a uma consulta existente
        /// </summary>
        /// <param name="idConsulta">id da consulta a ter a descrição atualizada</param>
        /// <param name="ConsultaComDescricao">objeto com atributo descrição</param>
        void AdicionarDecrição(int idConsulta, Consulta ConsultaComDescricao);

        /// <summary>
        /// Cancela uma consulta
        /// </summary>
        /// <param name="idConsulta">id da consulta a ser cancelada</param>
        /// <param name="status">status da consulta</param>
        void Cancela(int idConsulta, string status);
    }
}
