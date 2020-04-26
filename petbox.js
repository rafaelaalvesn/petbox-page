
/************************************** POST *********************/

// Executa o evento quando clicar no botão, aqui pode ser o botão de salvar novo cadastro, por exemplo.
$('#testePost').click(function () {

    //var server = "https://petbox-api.herokuapp.com/api/petbox/"
    var server = "http://localhost:8080/api/petbox/"

    //Exemplo de objeto JSON, a estrutura deve ser como a do postman. 
    //Pode copiar e colar o body do postman e colar aqui. Aquele grandão.
    const pedido =
    {
        "ID_ASSINANTE": 1 //aqui você vai pegar o valor do input >>>>>> $('#idInput').val();
    }

    // POST 
    $.ajax({
        url: server + "pedidos", //trocar pela URL
        type: 'post', // tipo do método aqui
        data: pedido, //json que vc colocou logo acima
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


/***************************GET********************************** */
$('#testeGet').click(async function () {

    var server = "http://localhost:8080/api/petbox/"

    await $.getJSON(server + "pedidos", async function (data) {  //data = resultado do get

        var html = '<div>' +
            '<h3 style="margin-left:1%">Pedidos</h3>' +
            '<hr>' +
            '</div>' //Monta cabeçalho de título, pode ficar direto na página se quiser

        for (let index = 0; index < data.length; index++) { //pega todas os dados recebidos pelo get e monta table

            //pega todos os dados e coloca no grid
            html += `<tr>` +
                `<th scope="row">${data[index].ID_PEDIDO}</th>` +
                `<td>${await data[index].ID_ASSINANTE}</td>` +
                `<td>${await StatusEntrega(data[index].FLG_ENTREGUE)}</td>` +
                `<td>${await FormataData(data[index].DATA_PEDIDO)}</td>` +
                `</tr>`
        }

        //pega todos os dados e coloca na div
        $("#resultado").html('<table class="table table-hover">' +
            ' <thead>' +
            '<tr>' +
            '<th scope="col">ID PEDIDO</th>' +
            '<th scope="col">NOME DO ASSINANTE</th>' +
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

async function GetNomeAssinante(idAssinante)
{
    var server = "http://localhost:8080/api/petbox/"
     $.getJSON(server+'/assinantes/'+idAssinante, async function (data) {
        return data.NOME;
    });
}

async function GetPlano(idPLano)
{
    if(idPLano == 1) return "Básico"
    else if (idPLano == 2) return "Clássico"
    else if (idPLano == 3) return "Master"
}
