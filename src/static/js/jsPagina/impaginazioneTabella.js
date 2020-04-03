// function impaginazione(){

// $('td', '#tableFlyLandedId').each(function(i) {
//     $(this).text(i+1);
// });



// $('table.paginated').each(function() {
//     var currentPage = 0;
//     var numPerPage = 10;
//     var $table = $(this);
//     $table.bind('repaginate', function() {
//         $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
//     });
//     $table.trigger('repaginate');
//     var numRows = $table.find('tbody tr').length;
//     var numPages = Math.ceil(numRows / numPerPage);
//     var $pager = $('<div class="pager"></div>');
//     var $previous = $('<span class="previous"><<</spnan>');
//     var $next = $('<span class="next">>></spnan>');
//     for (var page = 0; page < numPages; page++) {
//         $('<span class="page-number"></span>').text(page + 1).bind('click', {
//             newPage: page
//         }, function(event) {
//             currentPage = event.data['newPage'];
//             $table.trigger('repaginate');
//             $(this).addClass('active').siblings().removeClass('active');
//         }).appendTo($pager).addClass('clickable');
//     }
//     $pager.insertBefore($table).find('span.page-number:first').addClass('active');
//     $previous.insertBefore('span.page-number:first');
//     $next.insertAfter('span.page-number:last');
// });

// }
function impaginazione(){


var table ='#tableFlyLandedId';
$("#maxRows").on('change',function(){
    $('.pagination').html('');
    var trnum=0;
    var maxRows= parseInt($(this).val());
    var totalRows=$(table+' tbody tr').length;
    $(table+' tr:gt(0)').each(function(){
        trnum++;
        if(trnum>maxRows){
            $(this).hide();
        }
        if(trnum<= maxRows){
            $(this).show();
        }
    })
    if(totalRows>maxRows){
        var pagnum = Math.ceil(totalRows/maxRows);
        for(var i=0;i<=pagnum;){
            $('.pagination').append('<li data-page="'+i+'"><span>\"'+ i++ + '\"<span class="sr-only">(current)</span></span></li>').show()
        }
    }
    $('.pagination li:first-child').addClass('active')
    $('.pagination li').on('click',function(){
        var pageNum= $(this).attr('data-page')
        var trIndex=0;
        $('.pagination li').removeClass('active')
        $(this).addClass('active');
        $(table+' tr:gt(0)').each(function(){
            trIndex++
            if(trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
                $(this).hide();
            }else{
                $(this).show();
            }
        })
    })
})
// $(function(){
//     // $('table tr:eq(0)').prepend('<th>ID</th>');
//     var id = 0;
//     $('table tr:gt(0)').each(function(){
//         id++;
//         $(this).prepend('<td >'+id+'</td>');
//     })
// })

}