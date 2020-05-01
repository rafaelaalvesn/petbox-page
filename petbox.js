$(document).ready(function () {

   sessionStorage.setItem("server", "https://petbox-api.herokuapp.com/api/petbox/");
  //sessionStorage.setItem("server", "http://localhost:8080/api/petbox/");

    //  $("#cadastroEmail").val('xx@gmail.com');
    //  $("#cadastroSenha").val('123');
    //  $("#cadastroConfirmacaoSenha").val('123');

    // $("#cadastroCEP").val('31910030');
    // $("#cadastroTipoLogradouro").val('Rua');
    // $("#cadastroNomeRua").val('HollyWood Street');
    // $("#cadastroNumero").val('600');
    // $("#cadastroBairro").val('Holly');
    // $("#cadastroCidade").val('Wood');
    // $("#cadastroEstado").val('MG');

    // $("#cadastroCPF").val('13219649602');
    // $("#cadastroTelefone").val('993964466');
    // $("#cadastroNomeAnimal").val('Paty');

})



$('#submitCadastro').click(async function () {

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

    // POST 

     $.ajax({
        url: server + "novoCadastro",
        type: 'post',
        data: dadosCadastro,
    })
        .done(function (msg) {
            alert("Cadastro realizado com sucesso") + msg;
        })
        .fail(function (jqXHR, textStatus, msg) {
            alert(msg);
        });

alert("Feito");

});


$('#getLogin').click(async function () {

    var email = document.getElementById('loginEmail');
    var senha = document.getElementById('loginSenha');
    Logar(email, senha);
});


async function Logar(email, senha) {

    var loginEncontrado;
    var server = sessionStorage.getItem("server");

    await $.getJSON(server + "logins", async function (data) {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
            if (data[index].EMAIL_ASSINANTE == email.value && data[index].SENHA == senha.value) {
                loginEncontrado = true;
                sessionStorage.setItem("idLOGIN", data[index].ID_LOGIN);
                window.location.href = "pedido.html";
            }
        }
        if (!loginEncontrado) {
            alert("Usuário ou senha incorretos.")
        }
    })



}


/*************TRATATAMENTO DOS DADOS DO JSON *******************/

async function FormataData(data) {
    data = data.substring(0, 10)
    var diaF = data.split("-")[2];
    var mesF = data.split("-")[1];
    var anoF = data.split("-")[0];
    return diaF + "/" + mesF + "/" + anoF
}


async function GetNomeAssinante(idAssinante) {

    var server = sessionStorage.getItem("server");

    $.getJSON(server + '/assinantes/' + idAssinante, async function (data) {
        return data.NOME;
    });
}

async function GetPlano(idPLano) {
    if (idPLano == 1) return "Básico"
    else if (idPLano == 2) return "Clássico"
    else if (idPLano == 3) return "Master"
}
