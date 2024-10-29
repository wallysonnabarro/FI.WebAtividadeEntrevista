$(document).ready(function () {
    $('.alterar-btn').click(function (e) {
        $('#CPFBENEFICIARIO').val('');
        $('#NomeBENEFICIARIO').val('');

        e.preventDefault();
        var beneficiarioId = $(this).data('id');
        var cpf = $(this).data('cpf');
        var nome = $(this).data('nome');

        sessionStorage.setItem('beneficiarioId', beneficiarioId);

        $('#CPFBENEFICIARIO').val(cpf);
        $('#NomeBENEFICIARIO').val(nome);
    });
})

