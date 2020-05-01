$(document).ready(function () {


    let idlogin = sessionStorage.getItem("idLOGIN");

    getPedidosByID(idlogin);
    GetAssinante(idlogin);

    async function getPedidosByID(id) {

        var server = sessionStorage.getItem("server");

        await $.getJSON(server + "pedidosAssinante/" + id, async function (data) {  //data = resultado do get
            console.log(data)
            var html = '<div>' +
                '<h3>Pedidos</h3>' +
                '<hr>' +
                '</div>'

            for (let index = 0; index < data.length; index++) {
                html += `<tr>` +
                    `<th scope="row">${data[index].ID_PEDIDO}</th>` +
                    `<td>${await StatusEntrega(data[index].ID_PEDIDO)}</td>` +
                    `<td>${await FormataData(data[index].DATA_PEDIDO)}</td>` +
                    `</tr>`
            }

            $("#listaPedidos").html('<table class="table table-hover">' +
                ' <thead>' +
                '<tr>' +
                '<th scope="col">ID PEDIDO</th>' +
                '<th scope="col">STATUS ENTREGA</th>' +
                '<th scope="col">DATA DO PEDIDO</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                html +
                '</tbody>' +
                '</table>'
            )
        })
    }
    
    $('#editaCadastro').click(function () {
        GetAssinante(idlogin);
        GetEndereco(idlogin);
        GetAnimal(idlogin);
        GetLogin(idlogin);
    })

    async function GetLogin(idlogin) {

        var server = sessionStorage.getItem("server");

        $.getJSON(server + 'logins', async function (data) {
            console.log("logins", idlogin)

            for (let index = 0; index < data.length; index++) {
                if (idlogin == data[index].ID_LOGIN) {
                    $("#cadastroEmail").val(data[index].EMAIL_ASSINANTE);
                    $("#cadastroSenha").val(data[index].SENHA);
                    $("#cadastroConfirmacaoSenha").val(data[index].SENHA);
                }
            }
        });
    }


    async function GetAssinante(idlogin) {

        var server = sessionStorage.getItem("server");

        $.getJSON(server + 'assinantes/' + idlogin, async function (data) {
            console.log(data.CADASTRO_ATIVO)

            if (data.CADASTRO_ATIVO == true) {
                $("#statusDoCadastro").html("ATIVO");
                $("#statusDoCadastro").addClass("ativo");
                $("#statusDoCadastro").removeClass("inativo");

            }
            else if (data.CADASTRO_ATIVO == false) {

                $("#statusDoCadastro").html("INATIVO");
                $("#statusDoCadastro").addClass("inativo");
                $("#statusDoCadastro").removeClass("ativo");
            }

            $("#cadastroNome").val(data.NOME);
            $("#cadastroCPF").val(data.CPF);
            $("#cadastroTelefone").val(data.TELEFONE_PRINCIPAL);
            $("#cadastroDataNascimento").val(data.DT_NASCIMENTO.substring(0,10));
            $("#nomeASSINANTE").html("Olá, " + data.NOME);
        });
    }

    async function GetAnimal(idlogin) {

        var server = sessionStorage.getItem("server");

        $.getJSON(server + 'animaisAssinante/' + idlogin, async function (data) {
            console.log(data)
            data.forEach(element => {
                $("#cadastroTipoAnimal").val(element.ID_TIPO_ANIMAL);
                $("#cadastroNomeAnimal").val(element.NOME_ANIMAL);
                $("#cadastrosEXOAnimal").val(element.SEXO_ANIMAL);
                if (element.ID_PORTE == 1) {
                    $("#cadastroPorteAnimal").val("Pequeno 8kg");
                }
                else if (element.ID_PORTE == 2) {
                    $("#cadastroPorteAnimal").val("Médio - 8kg a 15kg");
                }
                else if (element.ID_PORTE == 3) {
                    $("#cadastroPorteAnimal").val("Grande . 15kg");
                }
            });
        });
    }


    async function GetEndereco(idlogin) {

        var server = sessionStorage.getItem("server");

        $.getJSON(server + 'enderecosAssinante/' + idlogin, async function (data) {
            console.log(data)
            data.forEach(element => {
                $("#cadastroCEP").val(element.CEP);
                $("#cadastroTipoLogradouro").val(element.TIPO_LOGRADOURO);
                $("#cadastroNomeRua").val(element.LOGRADOURO);
                $("#cadastroNumero").val(element.NUMERO);
                $("#cadastroBairro").val(element.BAIRRO);
                $("#cadastroCidade").val(element.CIDADE);
                $("#cadastroEstado").val(element.ESTADO);
            });

        });
    }



    $('#submitEditaCadastro').click(function () {

        var server = sessionStorage.getItem("server");

        const dadosCadastro =

        {
            "LOGIN":
            {
                "EMAIL_ASSINANTE": $('#cadastroEmail').val(),
                "SENHA": $('#cadastroSenha').val()
            },
            "ASSINANTE":
            {
                "NOME": $('#cadastroNome').val(),
                "CPF": $('#cadastroCPF').val(),
                "ID_PLANO": $('#cadastroAssinatura').val(),
                "TELEFONE_PRINCIPAL": $('#cadastroTelefone').val(),
                "DT_NASCIMENTO": $('#cadastroDataNascimento').val()
            },
            "ENDERECO":
            {
                "CEP": $('#cadastroCEP').val(),
                "TIPO_LOGRADOURO": $('#cadastroTipoLogradouro').val(),
                "LOGRADOURO": $('#cadastroLogradouro').val(),
                "NUMERO": $('#cadastroNumero').val(),
                "BAIRRO": $('#cadastroBairro').val(),
                "CIDADE": $('#cadastroCidade').val(),
                "ESTADO": $('#cadastroEstado').val(),
            },
            "ANIMAL":
            {
                "ID_TIPO_ANIMAL": $('#cadastroTipoAnimal').val(),
                "NOME_ANIMAL": $('#cadastroNomeAnimal').val(),
                "SEXO_ANIMAL": $('#cadastroSexoAnimal').val(),
                "ID_PORTE": $('#cadastroPorteAnimal').val(),
            }
        }

        console.log(dadosCadastro);
        $.ajax({
            url: server + "editarCadastro/" + idlogin,
            type: 'put', 
            data: dadosCadastro,
            beforeSend: function () {
            }
        })
            .done(function (msg) {
                alert("Deu certo");
            })
            .fail(function (jqXHR, textStatus, msg) {
                alert(msg);
            });
    });


    $('#statusDoCadastro').click(function () {

        var server = sessionStorage.getItem("server");

        $.ajax({
            url: server + "desativarCadastro/",
            type: 'post',
            data:
            {
                "ID_ASSINANTE": idlogin
            }
        });
        GetAssinante(idlogin);

    });

});


 async function StatusEntrega(idPedido) {
      
    return new Promise((resolve, reject) => {
        $.ajax({
        beforeSend: function(request) {
           request.setRequestHeader("Authorization", 'Bearer key5vsWx2WI9FaZPC');
        },
        type: 'GET',
        dataType: "json",
        url: `https://api.airtable.com/v0/applWk6IGtiasBZJs/Pedidos/?filterByFormula={Número}=${idPedido}`,
          success: function(data) {
            resolve(data.records[0].fields.Status.toUpperCase()) 
          },
          error: function(error) {
            reject(error)
          },
        })
      })

}
