$(document).ready(function () {
    $('#ExcluirBeneficiario').click(function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        if (confirm("Tem certeza que deseja excluir este beneficiário?")) {
            $.ajax({
                url: urlExcluir,
                type: 'POST',
                data: { id: id },
                success: function (response) {
                    alert("Beneficiário excluído com sucesso.");
                    location.reload();
                },
                error: function (error) {
                    console.log("Erro ao excluir beneficiário:", error);
                }
            });
        }
    });
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