$(document).ready(function () {
    $("#input-buscar-cep").inputmask("99999-999");
});

async function FindCep() {
    this.ClearInputs();
    let cepValueInput = document.getElementById("input-buscar-cep").value;

    if (this.ValidateInputEmpty(cepValueInput)) {
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "/BuscaCep/GetDataByCep",
            data: { cep: cepValueInput },
            beforeSend: function () {
                $("#spinner-div").show();
            },
            success: function (response) {
                const obj = JSON.parse(response);
                if (obj.erro === "true")
                {
                    showAlert("Nenhum endereço encontrado para o CEP informado, verifique!")
                    return false;
                }
                else
                {
                    $("#inputLogradouro").val(obj.logradouro);
                    $("#inputComplemento").val(obj.complemento);
                    $("#inputBairro").val(obj.bairro);
                    $("#inputLocalidade").val(obj.localidade);
                    $("#inputUF").val(obj.uf);
                    $("#inputIBGE").val(obj.ibge);
                    $("#inputGIA").val(obj.gia);
                    $("#inputDDD").val(obj.ddd);
                    $("#inputSiafi").val(obj.siafi);
                }
                
            },
            complete: function () {
                $("#spinner-div").hide(); //Request is complete so hide spinner
            },
            error: function (thrownError) {
                console.log(thrownError);
            }
        });
    }
    else
    {
        showAlert("Nenhum CEP informado, verifique!")
        return false;
    }
    
};

function ValidateInputEmpty(cep) {
    if (cep != null && cep != "") {
        return true;
    }
    else {
        return false;
    }
};

function ClearInputs(cep) {
    $("#inputLogradouro").val("");
    $("#inputComplemento").val("");
    $("#inputBairro").val("");
    $("#inputLocalidade").val("");
    $("#inputUF").val("");
    $("#inputIBGE").val("");
    $("#inputGIA").val("");
    $("#inputDDD").val("");
    $("#inputSiafi").val("");
};

function showAlert(message) {
    $('#message_error').append('<div id="alertdiv"><span>' + message + '</span></div>')

    setTimeout(function () { 
        $("#alertdiv").remove();
    }, 3000);
}
