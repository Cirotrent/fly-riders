function impaginazione(tabella){
    
    var dim=tabella.length;
        
        
        rows=$('#maxRows').val();
        console.log(parseInt(dim/rows,10));
        
        $('.pagination').empty();
        $('.pagination').append('<li class="page-item"><button class="page-link" type="button" >'+"Previous"+'</button></li>');
        
        for(var x= 1;x<=(parseInt(dim/rows,10)); x++){
            if(x==pagSel){
                $('.pagination').append('<li data-page="'+x+'" class="page-item active"><button class="page-link" type="button" >'+x+'</button></li>');
            }else{
                $('.pagination').append('<li data-page="'+x+'" class="page-item"><button class="page-link" type="button" >'+x+'</button></li>');
            }
        }
        $('.pagination').append('<li  class="page-item"><button class="page-link" type="button" >'+"Next"+'</button></li>');

        $('.pagination li').on('click',function(){
            $('.pagination li').removeClass('active');
            pagSel=$(this).attr('data-page');
            $(this).addClass('active');
            paginaSelezionata(rows,pagSel);
        })

        paginaSelezionata(rows,pagSel);

        
}

function paginaSelezionata(nRows,pageSelected){
    $("#tableFlyLandedId").empty();
    for(var i=(nRows*(pageSelected-1))+1;i<(nRows*pageSelected);i++){
        var tdId = '<td>' + tabellaFL[i]._id + '</td>';
        var tdTratta = '<td>' + tabellaFL[i].tratta + '</td>';
        
        if(tabellaFL[i].status== "LANDED"){
            var tdStato = '<td>' + tabellaFL[i].status + '</td>';
            var tdPartenza='<td>' + tabellaFL[i].startDate + '</td>';
            var tdArrivo = '<td>' + tabellaFL[i].endDate  + '</td>';
            $('#tableFlyLandedId').append('<tr>' + tdId + tdTratta + tdStato + tdPartenza + tdArrivo+'</tr>');

        }else{
            var tdStato = '<td style="color: brown;">' + tabellaFL[i].status + '</td>';
            var tdPartenza='<td>' + tabellaFL[i].startDate + '</td>';
            var tdArrivo = '<td>' + "In volo...&#128747;" + '</td>';
            $('#tableFlyLandedId').append('<tr style="color: brown;">' + tdId + tdTratta + tdStato + tdPartenza + tdArrivo+'</tr>');

        }
    }
}