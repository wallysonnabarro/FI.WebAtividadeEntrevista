
$(document).ready(function () {
    $("#CPFBENEFICIARIO").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });
    $("#CPF").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });
    $("#CEP").inputmask("mask", { "mask": "99999-999" });
    $("#Telefone").inputmask("mask", { "mask": "(99) 9999-99999" });

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        if (!ValidarCPF($(this).find("#CPF").val())) {
            ModalDialog("Ocorreu um erro", "CPF inválido!.");
            return;
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "CPF": $(this).find("#CPF").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
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
                    ModalDialog("Sucesso!", r)

                    sessionStorage.setItem('idCliente', r.id);
                }
        });
    })

})
