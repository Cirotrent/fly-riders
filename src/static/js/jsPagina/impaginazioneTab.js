function impaginazione(tabella) {

    dim = tabella.length;
    nPag = Math.ceil(dim / MaxRows);
    //console.log(nPag);

    if (nPag > 15) {
        partizioni = nPag / 15;
        maxPag = indice * 15;
        popolaSetPag(pagSel, maxPag);
    } else {
        maxPag = nPag;
        popolaSetPag(pagSel, maxPag);
    }

    selezionaPag(dim, MaxRows);
    popolaPagina(MaxRows, pagSel);



}

function selezionaPag(dimenzioneTabella, MaxRows) {
    $('.pagination li').on('click', function () {
        if ($(this).attr('data-page') != "Tnext" && $(this).attr('data-page') != "Tprevious") {
            $('.pagination li').removeClass('active');
            //console.log("pag selezionata: " + $(this).attr('data-page'));

            if ($(this).attr('data-page') == "previous") {
                if (pagSel > maxPag - 14) {
                    pagSel--;
                }
                //console.log("PagSel: " + pagSel + "-MaxRows: " + MaxRows + "-DimTab: " + dimenzioneTabella);
                $("li[data-page='" + pagSel + "']").addClass('active');
            } else if ($(this).attr('data-page') == "next") {
                if (pagSel < maxPag) {
                    pagSel++;
                }
                //console.log("PagSel: " + pagSel + "-MaxRows: " + MaxRows + "-DimTab: " + dimenzioneTabella);
                $("li[data-page='" + pagSel + "']").addClass('active');
            }else {
                pagSel = $(this).attr('data-page');
                $(this).addClass('active');
            }
            popolaPagina(MaxRows, pagSel);
        }
        
    })
}

function saltaAvanti() {
    if (indice < partizioni) {

        if (indice > partizioni-1) {
            indice = partizioni;
        } else indice++;
    }
    maxPag = indice * 15;
    pagSel = maxPag - 14;
    $("li[data-page='" + pagSel + "']").addClass('active');
    popolaSetPag(pagSel, maxPag);
    selezionaPag(dim, MaxRows);
    popolaPagina(MaxRows, pagSel);
}

function saltaIndietro(){
        if (indice== partizioni) {
            indice--;
           indice= Math.ceil(indice);
           //console.log(indice);
        } else if(indice > 1){
            indice--;
        } 
    
    maxPag = indice * 15;
    pagSel = maxPag - 14;
    $("li[data-page='" + pagSel + "']").addClass('active');
    popolaSetPag(pagSel, maxPag);
    selezionaPag(dim, MaxRows);
    popolaPagina(MaxRows, pagSel);
}

function popolaPagina(nRows, pageSelected) {
    $("#tableFlyLandedId").empty();
    for (var i = (nRows * (pageSelected - 1)); i < (nRows * pageSelected); i++) {
        if (tabellaFL[i]) {
            var p = '<td>' + i + '</td>';
            var tdId = '<td>' + tabellaFL[i]._id + '</td>';
            var tdTratta = '<td>' + tabellaFL[i].tratta + '</td>';

            if (tabellaFL[i].status == "LANDED") {
                var tdStato = '<td>' + tabellaFL[i].status + '</td>';
                var tdPartenza = '<td>' + tabellaFL[i].startDate + '</td>';
                var tdArrivo = '<td>' + tabellaFL[i].endDate + '</td>';
                $('#tableFlyLandedId').append('<tr>' + p + tdId + tdTratta + tdStato + tdPartenza + tdArrivo + '</tr>');

            } else {
                var tdStato = '<td style="color: brown;">' + tabellaFL[i].status + '</td>';
                var tdPartenza = '<td>' + tabellaFL[i].startDate + '</td>';
                var tdArrivo = '<td>' + "In volo...&#128747;" + '</td>';
                $('#tableFlyLandedId').append('<tr style="color: brown;">' + p + tdId + tdTratta + tdStato + tdPartenza + tdArrivo + '</tr>');

            }
        }

    }
}

function popolaSetPag(paginaSelezionata, numeroMaxDiPagine) {

    $('.pagination').empty();
    if (numeroMaxDiPagine != 1) {
        var inizio;
        if (numeroMaxDiPagine >= 15) {
            inizio = numeroMaxDiPagine - 14;
        } else inizio = 1;
        $('.pagination').append('<li data-page="' + "previous" + '" class="page-item"><button class="page-link" type="button"  >' + "Previous" + '</button></li>');
        if (numeroMaxDiPagine >= 15) {
            $('.pagination').append('<li data-page="' + "Tprevious" + '" class="page-item"><button class="page-link" type="button" onclick="saltaIndietro()" >' + "<<<" + '</button></li>');
        }
        for (var i = inizio; i <= numeroMaxDiPagine; i++) {
            if (i == paginaSelezionata) {
                $('.pagination').append('<li data-page="' + i + '" class="page-item active"><button class="page-link" type="button" >' + i + '</button></li>');
            } else {
                $('.pagination').append('<li data-page="' + i + '" class="page-item"><button class="page-link" type="button" >' + i + '</button></li>');
            }
        }
        if (numeroMaxDiPagine >= 15) {
            $('.pagination').append('<li data-page="' + "Tnext" + '" class="page-item"><button class="page-link" type="button" onclick="saltaAvanti()">' + ">>>" + '</button></li>');
        }
        $('.pagination').append('<li data-page="' + "next" + '" class="page-item"><button class="page-link" type="button" >' + "Next" + '</button></li>');

    }

}



