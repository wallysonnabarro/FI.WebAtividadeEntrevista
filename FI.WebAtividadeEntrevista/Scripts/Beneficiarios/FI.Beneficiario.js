$(document).ready(function () {
    $('#formBeneficiarioCad').submit(function (e) {
        e.preventDefault();
        var beneficiarioId = sessionStorage.getItem('beneficiarioId');
        var idClienteSession = sessionStorage.getItem('idCliente');

        if (!ValidarCPF($(this).find("#CPFBENEFICIARIO").val())) {
            ModalDialog("Ocorreu um erro", "CPF inválido!.");
            return;
        }

        if (idClienteSession == null && (idCliente == 0 || idCliente == null)) {
            ModalDialog("Ocorreu um erro", "CPF inválido!.");
            return
        }
        $.ajax({
            url: urlBeneficiario,
            method: "POST",
            data: {
                "Id": beneficiarioId == null ? 0 : beneficiarioId,
                "Nome": $(this).find("#NomeBENEFICIARIO").val(),
                "CPF": $(this).find("#CPFBENEFICIARIO").val(),
                "IdCliente": idClienteSession == null ? idCliente : idClienteSession,
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r.Menssagem);

                    const nome = $("#NomeBENEFICIARIO").val();
                    const cpf = $("#CPFBENEFICIARIO").val();
                    const idBeneficiario = r.Id;

                    $("#tabelaBeneficiariosBody").append(`
                    <tr>
                        <td>${cpf}</td>
                        <td>${nome}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-danger excluir-btn" data-id="${idBeneficiario}">
                                Excluir
                            </button>
                        </td>
                    </tr>
                    `);

                    $("#formBeneficiarioCad")[0].reset();
                    location.reload();
                }
        });
    })

})

