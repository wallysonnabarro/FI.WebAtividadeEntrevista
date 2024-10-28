using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
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
    }
}
