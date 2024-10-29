using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Beneficiario
        /// </summary>
        /// <param name="beneficiario"></param>
        /// <returns></returns>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            cli.Alterar(beneficiario);
        }

        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            return cli.Incluir(beneficiario);
        }

        /// <summary>
        /// Lista os Beneficiario
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(long idCliente, int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            return cli.Pesquisa(idCliente, iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            return cli.VerificarExistencia(CPF);
        }

        /// <summary>
        /// Consulta o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            return cli.Consultar(id);
        }


        /// <summary>
        /// Excluir o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario cli = new DAL.Beneficiarios.DaoBeneficiario();
            cli.Excluir(id);
        }

    }
}
