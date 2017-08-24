$(document).ready(function () {

    var offset = 0;

    $('.card-load').click(function () {
        offset = offset + 10;
        console.log(offset);
        $.ajax({
            url: '/loadmore',

            beforeSend: function() {
                $('#wait').css("display", "block");
            },
            complete: function(data) {
                $('#wait').css("display", "none");
            }
        });
    });
});