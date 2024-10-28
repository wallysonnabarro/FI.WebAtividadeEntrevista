$(document).ready(function () {
    $('#formBeneficiarioCad').submit(function (e) {
        e.preventDefault();

        if (!ValidarCPF($(this).find("#CPFBENEFICIARIO").val())) {
            ModalDialog("Ocorreu um erro", "CPF inválido!.");
            return;
        }

        $.ajax({
            url: urlBeneficiario,
            method: "POST",
            data: {
                "Nome": $(this).find("#NomeBENEFICIARIO").val(),
                "CPF": $(this).find("#CPFBENEFICIARIO").val(),
                "IdCliente": idCliente,
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


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function ValidarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}
