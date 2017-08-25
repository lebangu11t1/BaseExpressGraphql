$(document).ready(function(){

    var offset = 0;
    var end_record = false;
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            if(end_record==false) {
                appendData();
            }
        }
    });

    function appendData() {
        offset = offset + 10;
        var circle_post_comment_id = $('#circle-post-comment-id').text();
        $('#area-load-talk').css("display", "initial");
        $.ajax({
            url: '/loadmore/talk/'+circle_post_comment_id+'/'+offset,
            type: 'GET',
        })
        .done(function(data) {
            $('#area-load-talk').css("display", "none");
            var avatar = '/assets/image/default-user.jpg';
            if(data.length == 0){ //no more records
                end_record = true; //set end record flag on
                return; //exit
            }
            data.forEach(function(comment) {
                if (comment.avatar!=null) {
                    avatar = JSON.parse(comment.avatar).thumb;
                }
                $('#load-talk').append(`
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-1" style="margin-right: 20px;padding-left: 5px;">
                                <a href="/users/${comment.user_id}"><img src="${avatar}" alt="..." class="rounded-circle" width="50px" height="50px"></a>
                                </div>
                            <div class="col-10" style="padding: 0px;">
                                <h6>${comment.username}</h6>
                                <div class="user-address">高校2年生</div>
                                <span data-parent_id = "${comment.parent_id}" class="talk-to" title="">to: なぁ❄</span>
                                <span class="sr-only tooltip-content">
                                            <img src='/assets/image/default-user.jpg' alt='...' class='rounded-circle tooltip-img avatar-${comment.parent_id}'>
                                            <div class='tooltip-user-infor'>
                                                <h6 class="username-${comment.parent_id}">❄なぁ</h6>
                                                <div class='tooltip-user-address'>高校2年生</div>
                                            </div>
                                            <time class='tooltip-status-time-infor from-now-${comment.parent_id}'>2 か月前</time>
                                            <p class='tooltip-comment titles-${comment.parent_id}'>ひま部に入部しました。よろしくお願いします！ #初めての投稿</p>
                                        </span>
                                <time class="status-time-infor">${comment.created_at}</time>
                                <p>${comment.body}</p>
                                <div class="status-talk">会話を見る</div>
                            </div>
                        </div>
                    </li>
                `);
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    }
});