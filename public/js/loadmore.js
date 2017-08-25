$(document).ready(function () {

    var offset = 0;

    $('.card-load').click(function () {
        offset = offset + 10;
        console.log(offset);
        $.ajax({
            url: '/loadmore',

            beforeSend: function() {
                $('#wait').css("display", "initial");
                $('.card-load').css("display", "none");
            },
            complete: function(data) {
                $('#wait').css("display", "none");
            }
        });
    });
    
    $('.talk-to').mouseover(function () {
        var parent_id = $(this).attr("data-parent_id");
        $.ajax({
            method: "GET",
            url: "/userInformation/"+ parent_id,
            dataType: 'json'
        })
            .done(function( data ) {
                if (data != 2) {
                    // $('.avatar-'+parent_id).attr('src', JSON.parse(data.avatar).thumb);
                    $('.avatar-'+parent_id).attr('src', JSON.parse(data.avatar).thumb);
                    $('.username-'+parent_id).html(data.username);
                    $('.titles-'+parent_id).html(data.title);
                    $('.from-now-'+parent_id).html(data.created_at);
                }
            });
    });

    $('.talk-to').mouseout(function () {
        console.log('ra')
    });
    
});