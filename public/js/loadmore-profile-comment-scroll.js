$(document).ready(function(){

    var offset = 0;
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            appendData();
        }
    });

    function appendData() {
        offset = offset + 10;
        var user_id = $('#user-id').text();
        $('#area-load-comment').css("display", "initial");
        $.ajax({
            url: '/loadmore/profile/'+user_id+'/'+offset,
            type: 'GET',
        })
        .done(function(data) {
            $('#area-load-comment').css("display", "none");
            var avatar = '/assets/image/default-user.jpg';
            data.forEach(function(comment) {
                if (comment.avatar!=null) {
                    avatar = JSON.parse(comment.avatar).thumb;
                }
                if (comment.parent_id==null) {
                    $('#profile-load-comment').append(`
                        <li class="list-group-item ">
                            <div class="row ">
                                <div class="col-1" style="margin-right: 20px;padding-left: 5px;">
                                    <img src="${avatar}" alt="..." class="rounded-circle" width="50px" height="50px">
                                </div>
                                <div class="col-10" style="padding: 0px;">
                                    <a>
                                        <h6>${comment.username}</h6>
                                        <div class="user-address">高校2年生</div>
                                        <time class="status-time-infor">${comment.created_at}</time>
                                        <p>${comment.body}</p>
                                    </a>
                                </div>
                            </div>
                        </li>
                    `);
                } else {
                    $('#profile-load-comment').append(`
                        <li class="list-group-item ">
                            <a href="/club/conversation/${comment.parent_id}">
                                <div class="row">
                                    <div class="col-1" style="margin-right: 20px;padding-left: 5px; ">
                                    <img src="${avatar}" alt="... " class="rounded-circle " width="50px " height="50px ">
                                </div>
                                <div class="col-10 " style="padding: 0px; ">
                                    <h6>${comment.username}</h6>
                                    <div class="user-address ">高校2年生</div>
                                    <span data-parent_id = "${comment.parent_id}" class="talk-to" title=" ">to: </span>
                                    <span class="sr-only tooltip-content">
                                        <img src='/assets/image/default-user.jpg' alt='...' class='rounded-circle tooltip-img avatar-${comment.parent_id}'>
                                        <div class='tooltip-user-infor'>
                                            <h6 class="username-${comment.parent_id}">❄なぁ</h6>
                                            <div class='tooltip-user-address'>高校2年生</div>
                                        </div>
                                        <time class='tooltip-status-time-infor from-now-${comment.parent_id}'>2 か月前</time>
                                        <p class='tooltip-comment titles-${comment.parent_id}'>ひま部に入部しました。よろしくお願いします！ #初めての投稿</p>
                                    </span>
                                    <time class="status-time-infor ">${comment.created_at}</time>
                                    <p>${comment.body}</p>
                                    <div class="status-talk ">会話を見る</div>
                                </div>
                                </div>
                            </a>
                        </li>
                    `); 
                }
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