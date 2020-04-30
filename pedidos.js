$(document).ready(function () {

    let idlogin = sessionStorage.getItem("idLOGIN");

    getPedidosByID(idlogin);
    GetAssinante(idlogin);
    /***************************GET********************************** */
    async function getPedidosByID(id) {

        var server = sessionStorage.getItem("server");


        await $.getJSON(server + "pedidosAssinante/" + id, async function (data) {  //data = resultado do get
            console.log(data)
            var html = '<div>' +
                '<h3>Pedidos</h3>' +
                '<hr>' +
                '</div>' //Monta cabeçalho de título, pode ficar direto na página se quiser

            for (let index = 0; index < data.length; index++) { //pega todas os dados recebidos pelo get e monta table
                //pega todos os dados e coloca no grid
                html += `<tr>` +
                    `<th scope="row">${data[index].ID_PEDIDO}</th>` +
                    `<td>${await StatusEntrega(data[index].FLG_ENTREGUE)}</td>` +
                    `<td>${await FormataData(data[index].DATA_PEDIDO)}</td>` +
                    `</tr>`
            }

            //pega todos os dados e coloca na div
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

        $.getJSON(server + 'logins', async function (data) {
            console.log("logins", idlogin)

            for (let index = 0; index < data.length; index++) {
                if (idlogin == data[index].ID_LOGIN) {
                    $("#cadastroEmail").val(data[index].EMAIL_ASSINANTE);
                    $("#cadastroSenha").val(data[index].SENHA);
                    $("#cadastroConfirmacaoSenha").val(data[index].SENHA);
                }
            }
            // $("#cadastroNome").val(data.NOME);
            // $("#cadastroCPF").val(data.CPF);
            // $("#cadastroTelefone").val(data.TELEFONE_PRINCIPAL);
            // $("#cadastroDataNascimento").val(data.DT_NASCIMENTO);
            //   $("#cadastroNome").val(data.NOME);
        });
    }


    async function GetAssinante(idlogin) {

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
            $("#cadastroDataNascimento").val(data.DT_NASCIMENTO);
            $("#nomeASSINANTE").html("Olá, " + data.NOME);
        });
    }

    async function GetAnimal(idlogin) {
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



    // Executa o evento quando clicar no botão, aqui pode ser o botão de salvar novo cadastro, por exemplo.
    $('#submitEditaCadastro').click(function () {
        // alert("recadastro")
        
        var server = sessionStorage.getItem("server");


        //Exemplo de objeto JSON, a estrutura deve ser como a do postman. 
        //Pode copiar e colar o body do postman e colar aqui. Aquele grandão.
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
                "DT_NASCIMENTO": $('#cadastroDataNascimento').val(),
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
            url: server + "editarCadastro/" + idlogin, //trocar pela URL
            type: 'put', // tipo do método aqui
            data: dadosCadastro, //json que vc colocou logo acima
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            }
        })
            .done(function (msg) {
                // $("#resultado").html(msg); //mensagem de sucesso, pode ser um alert pro usuário.
                alert("Deu certo");
            })
            .fail(function (jqXHR, textStatus, msg) {
                alert(msg); //mensagem de sucesso, pode ser um alert pro usuário.
            });
    });


    $('#statusDoCadastro').click(function () {

        $.ajax({
            url: server + "desativarCadastro/", //trocar pela URL
            type: 'post', // tipo do método aqui
            data:
            {
                "ID_ASSINANTE": idlogin
            }
            //json que vc colocou logo acima
        });
        GetAssinante(idlogin);

    });

});


