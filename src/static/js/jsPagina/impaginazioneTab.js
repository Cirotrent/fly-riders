function impaginazione(tabella){
    var dim=tabella.length;
        
        console.log("ciaooooo"+dim);
        rows=$('#maxRows').val();

        $("#tableFlyLandedId").empty();
        $('.pagination').empty();
        $('.pagination').append('<li class="page-item"><button class="page-link" type="button" >'+"Previous"+'</button></li>');
        for(var x= 1;x<=dim/rows; x++){
            $('.pagination').append('<li class="page-item"><button class="page-link" type="button" >'+x+'</button></li>');
        }
        $('.pagination').append('<li class="page-item"><button class="page-link" type="button" >'+"Next"+'</button></li>');

        // $('.pagination li').on('click',function(){
        //     $(this).addClass('active');
        // })

        for(var i=0;i<rows;i++){
            var tdId = '<td>' + tabella[i]._id + '</td>';
            var tdTratta = '<td>' + tabella[i].tratta + '</td>';
            
            if(tabella[i].status== "LANDED"){
                var tdStato = '<td>' + tabella[i].status + '</td>';
                var tdPartenza='<td>' + tabella[i].startDate + '</td>';
                var tdArrivo = '<td>' + tabella[i].endDate  + '</td>';
                $('#tableFlyLandedId').append('<tr>' + tdId + tdTratta + tdStato + tdPartenza + tdArrivo+'</tr>');

            }else{
                var tdStato = '<td style="color: brown;">' + tabella[i].status + '</td>';
                var tdPartenza='<td>' + tabella[i].startDate + '</td>';
                var tdArrivo = '<td>' + "In volo...&#128747;" + '</td>';
                $('#tableFlyLandedId').append('<tr style="color: brown;">' + tdId + tdTratta + tdStato + tdPartenza + tdArrivo+'</tr>');

            }
        }
}