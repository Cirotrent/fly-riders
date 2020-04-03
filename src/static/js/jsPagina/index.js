var cont = 0;
var tabellaFL;
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
        var tdAzione = '<td>' + "<button type='button' class='btn btn-primary btn-md' id='clickFly' onclick='fly(" +JSON.stringify(val)+ ")' style='background-color: brown;'>" + "Fly" + "</button>" + '</td>';

        $('#tableCreatedId').append('<tr>' + tdId + tdTratta + tdAzione + '</tr>');

    });

}

function generaListaFlyLanded() {
    if(cont==0){
        setInterval(generaListaFlyLanded, 10000);
        cont++;
    }
    doCall('GET', 'http://212.237.32.76:3001/status', undefined, function (risposta) {
        // ON SUCCESS
        tabellaFL=risposta;
        $("#tableFlyLandedId").show();
        creaTabellaFlyLanded();
       
    });
}

function creaTabellaFlyLanded() {

    $("#tableFlyLandedId").empty();
    $('#pagId').empty();
    tabellaFL.sort(function (a, b) {
        var statusA = a._id.toUpperCase(); // ignora maiuscole e minuscole
        var statusB = b._id.toUpperCase(); // ignora maiuscole e minuscole
        if (statusA > statusB) {
            return -1;
        }
        if (statusA > statusB) {
            return 1;
        }
        // i nomi devono essere uguali
        return 0;
    });


    if($('#maxRows').val()==600){

        $.each(tabellaFL, function (key, val) {
            var tdId = '<td>' + val._id + '</td>';
            var tdTratta = '<td>' + val.tratta + '</td>';
            
            if(val.status== "LANDED"){
                var tdStato = '<td>' + val.status + '</td>';
                var tdPartenza='<td>' + val.startDate + '</td>';
                var tdArrivo = '<td>' + val.endDate  + '</td>';
                $('#tableFlyLandedId').append('<tr>' + tdId + tdTratta + tdStato + tdPartenza + tdArrivo+'</tr>');

            }else{
                var tdStato = '<td style="color: brown;">' + val.status + '</td>';
                var tdPartenza='<td>' + val.startDate + '</td>';
                var tdArrivo = '<td>' + "In volo...&#128747;" + '</td>';
                $('#tableFlyLandedId').append('<tr style="color: brown;">' + tdId + tdTratta + tdStato + tdPartenza + tdArrivo+'</tr>');

            }
        });
    }else impaginazione(tabellaFL);

            // impaginazione();
        
}





function fly(volo) {
    doCall('GET', 'http://212.237.32.76:3001/start/' + volo._id, undefined, function (risposta) {
        // ON SUCCESS
        
        // aggiornaTabellaCreated(id);
        generaListaCreati();
        volo.status="FLYING";
        aggiornaTabellaFlyLanded(volo);
        
    });
}

function aggiornaTabellaFlyLanded(volo){
        var tdId = '<td>' + volo._id + '</td>';
        var tdTratta = '<td>' + volo.tratta + '</td>';
        var tdStato = '<td>' + volo.status + '</td>';
        var tdPartenza='<td>' + "In partenza..." + '</td>';
        $('#tableFlyLandedId').prepend('<tr style="color: brown;">' + tdId + tdTratta + tdStato + tdPartenza  + '</tr>');
}


function fun1(){
    console.log("ciao");
}
