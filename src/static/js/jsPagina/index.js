
var tabellaFL;
var pagSel = 1;
var MaxRows = 10;
var dim;// dimenzione tabella (in righe)
var nPag;
var partizioni;
var indice = 1;
var maxPag;

$(document).ready(function () {
    $('#maxRows').change(function () {

        if ($('#maxRows').val() == "all") {
            MaxRows = dim;
        } else MaxRows = $('#maxRows').val();
        //console.log("sono dentro!")
        pagSel = 1;
        nPag = Math.ceil(dim / MaxRows);
        if (nPag > 15) {
            indice=1;
            partizioni = nPag / 15;
            maxPag = indice * 15;
            popolaSetPag(pagSel, maxPag);
        } else {
            maxPag = nPag;
            popolaSetPag(pagSel, maxPag);
        }

        selezionaPag(dim, MaxRows);
        popolaPagina(MaxRows, pagSel);
        return;
    });
    $("#tableFlyLandedId").show();
    setInterval(generaListaFlyLanded, 5000);
});

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
    $.ajax({
        url: urlPath,
        type: typeRequest,
        data: JSON.stringify(parametri),
        success: callbackOnSuccess,
        error: callbackOnError,
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json',
        }
    });
}


function generaListaCreati() {

    doCall('GET', 'http://212.237.32.76:3001/list', undefined, function (risposta) {
        // ON SUCCESS
        $("#tableCreatedId").show();
        creaTabellaCreated(risposta);
    });



}

function creaTabellaCreated(risposta) {
    $("#tableCreatedId").empty();
    $.each(risposta, function (key, val) {
        var tdId = '<td>' + val._id + '</td>';
        var tdTratta = '<td>' + val.tratta + '</td>';
        var tdAzione = '<td>' + "<button type='button' class='btn btn-primary btn-md' id='clickFly' onclick='fly(" + JSON.stringify(val) + ")' style='background-color: brown;'>" + "Fly" + "</button>" + '</td>';

        $('#tableCreatedId').append('<tr>' + tdId + tdTratta + tdAzione + '</tr>');

    });

}

function generaListaFlyLanded() {
    doCall('GET', 'http://212.237.32.76:3001/status', undefined, function (risposta) {
        // ON SUCCESS
        tabellaFL = risposta;
        creaTabellaFlyLanded();
    });
}

function creaTabellaFlyLanded() {

    tabellaFL.sort(function (a, b) {
        var dateA = a.startDate;
        var dateB = b.startDate;
        if (dateA > dateB) {
            return -1;
        }
        if (dateA < dateB) {
            return 1;
        }
        return 0;
    });

    impaginazione(tabellaFL);

}

function fly(volo) {
    doCall('GET', 'http://212.237.32.76:3001/start/' + volo._id, undefined, function (risposta) {
        // ON SUCCESS

        generaListaCreati();
        volo.status = "FLYING";
        aggiornaTabellaFlyLanded(volo);

    });
}

function aggiornaTabellaFlyLanded(volo) {
    var a = '<td>' + "->" + '</td>';
    var tdId = '<td>' + volo._id + '</td>';
    var tdTratta = '<td>' + volo.tratta + '</td>';
    var tdStato = '<td>' + volo.status + '</td>';
    var tdPartenza = '<td>' + "In partenza..." + '</td>';
    $('#tableFlyLandedId').prepend('<tr style="color: brown;">' + a + tdId + tdTratta + tdStato + tdPartenza + '</tr>');
}

