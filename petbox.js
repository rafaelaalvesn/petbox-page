
/************************************** POST *********************/

// Executa o evento quando clicar no botão, aqui pode ser o botão de salvar novo cadastro, por exemplo.
$('#submitCadastro').click(function () {
  var server = "https://petbox-api.herokuapp.com/api/petbox/"
   //var server = "http://localhost:8080/api/petbox/"

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
            "LOGRADOURO": $('#cadastroNomeRua').val(),
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


    // {
    //     "ID_ASSINANTE": 1 //aqui você vai pegar o valor do input >>>>>> $('#idInput').val();
    // }

    // POST 

    console.log(dadosCadastro);
    $.ajax({
        url: server + "novoCadastro", //trocar pela URL
        type: 'post', // tipo do método aqui
        data: dadosCadastro, //json que vc colocou logo acima
        beforeSend: function () {
            $("#resultado").html("ENVIANDO...");
        }
    })
        .done(function (msg) {
            // $("#resultado").html(msg); //mensagem de sucesso, pode ser um alert pro usuário.
            alert("Cadastro realizado com sucesso.");
        })
        .fail(function (jqXHR, textStatus, msg) {
            alert(msg); //mensagem de sucesso, pode ser um alert pro usuário.
        });
});





/***************************GET********************************** */
$('#getLogin').click(async function () {

    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');

    console.log(email.value + "---" + senha.value)
    //var server = "http://localhost:8080/api/petbox/"
    var server = "https://petbox-api.herokuapp.com/api/petbox/"

    await $.getJSON(server + "logins", async function (data) {  //data = resultado do get
        console.log(data)
        //pega todas os dados recebidos pelo get e monta table
        for (let index = 0; index < data.length; index++) {
            if (data[index].EMAIL_ASSINANTE == email.value && data[index].SENHA == senha.value) {
                // console.log(data[index].ID_LOGIN)
                // console.log("loginOK" + data[index].EMAIL_ASSINANTE + data[index].SENHA + data[index].ID_LOGIN)
                sessionStorage.setItem("idLOGIN", data[index].ID_LOGIN);
                // getPedidosByID(data[index].ID_LOGIN);
                window.location.href = "pedido.html";
            }
        }
        
    })
});



/*************TRATATAMENTO DOS DADOS DO JSON *******************/

async function FormataData(data) {
    data = data.substring(0, 10)
    var diaF = data.split("-")[2];
    var mesF = data.split("-")[1];
    var anoF = data.split("-")[0];
    return diaF + "/" + mesF + "/" + anoF

}

async function StatusEntrega(entregue) {
    if (entregue) return "ENTREGUE"
    else return "ENTREGA PENDENTE"
}

async function GetNomeAssinante(idAssinante) {
    //var server = "http://localhost:8080/api/petbox/"
    var server = "https://petbox-api.herokuapp.com/api/petbox/"

    $.getJSON(server + '/assinantes/' + idAssinante, async function (data) {
        return data.NOME;
    });
}

async function GetPlano(idPLano) {
    if (idPLano == 1) return "Básico"
    else if (idPLano == 2) return "Clássico"
    else if (idPLano == 3) return "Master"
}
