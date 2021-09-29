using Microsoft.AspNetCore.Http;
using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmed_webAPI.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// Valida o usuário 
        /// </summary>
        /// <param name="email">E-mail do usuário</param>
        /// <param name="senha">Senha do usuário</param>
        /// <returns>Um objeto do tipo Usuario que foi encontrado</returns>
        Usuario Login(string email, string senha);

        void SalvarPerfilBD(IFormFile foto, int idUsuario);

        void SalvarPerfilDir(IFormFile foto, int idUsuario);

        string ConsultarPerfilBD(int idUsuario);

        string ConsultarPerfilDir(int idUsuario);
    }
}
