using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace FI.WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        [HttpPost]
        public JsonResult BeneficiarioList(long idCliente, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(idCliente, jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Beneficiario(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (model.Id > 0)
                {
                    bo.Alterar(new Beneficiario()
                    {
                        Id = model.Id,
                        CPF = model.CPF,
                        Nome = model.Nome,
                        IDCLIENTE = model.IdCliente,
                    });

                    return Json(new { Menssagem = "Alteração efetuada com sucesso", Id = model.Id });
                }
                else
                {
                    if (bo.VerificarExistencia(model.CPF))
                    {
                        Response.StatusCode = 400;
                        return Json(string.Join(Environment.NewLine, "CPF já existente no banco de dados, não é permitida a existência de um CPF duplicado."));
                    }

                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        CPF = model.CPF,
                        Nome = model.Nome,
                        IDCLIENTE = model.IdCliente,
                    });
                }

                return Json(new { Menssagem = "Cadastro efetuado com sucesso", Id = model.Id });
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario bene = bo.Consultar(id);

            if (bene != null)
            {
                ViewBag.BeneficiarioModel = new BeneficiarioModel()
                {
                    Id = bene.Id,
                    IdCliente = bene.IDCLIENTE,
                    CPF = bene.CPF,
                    Nome = bene.Nome,
                };
            }

            return PartialView("~/Views/Beneficiario/FormsBeneficiario.cshtml");
        }


        [HttpPost]
        public ActionResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bo.Excluir(id);

            return Json("Excluído efetuado com sucesso");
        }
    }
}