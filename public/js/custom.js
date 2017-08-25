$(document).ready(function(){
  	$(".talk-to").tooltip({
    	content: function(){ 
        	return $(this).parent().find('.tooltip-content').html(); 
    	},
    	tooltipClass: "custom-tooltip-styling",
  	});



    $(document).on('mouseover', '.talk-to',function () {
        var parent_id = $(this).attr("data-parent_id");
        $.ajax({
            method: "GET",
            url: "/userInformation/"+ parent_id,
            dataType: 'json'
        })
            .done(function( data ) {
                if (data != 2) {
                    $('.avatar-'+parent_id).attr('src', JSON.parse(data.avatar).thumb);
                    $('.username-'+parent_id).html(data.username);
                    $('.titles-'+parent_id).html(data.title);
                    $('.from-now-'+parent_id).html(data.created_at);
                }
            });
    });

    $('.talk-to').mouseout(function () {
    //    do something
    });

});