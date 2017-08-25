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
        var group_id = $('#group-id').text();
        $('#area-load-group').css("display", "initial");
        $.ajax({
            url: '/loadmore/'+group_id+'/'+offset,
            type: 'GET',
        })
        .done(function(data) {
            $('#area-load-group').css("display", "none");
            var avatar = '/assets/image/default-user.jpg';
            if(data.length == 0){ //no more records
                end_record = true; //set end record flag on
                return; //exit
            }
            data.forEach(function(post) {
                if (post.avatar!=null) {
                    avatar = JSON.parse(post.avatar).thumb;
                }
                if (post.required_approve == 1) {
                    $('#load-group').append(`
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-1" style="margin-right: 20px;padding-left: 5px;">
                                    <a href="/users/${post.id_user}"><img src= "${avatar}"  alt="..." class="rounded-circle" width="50px" height="50px"></a>
                                </div>
                                <div class="col-10" style="padding: 0px;">
                                    <a href="/club/${post.id}">
                                        <h6>${post.title}</h6>
                                        <time class="status-time-infor">${post.created_at}</time>
                                        <p class="par">${post.body}</p>
                                        <p>
                                            <span class="name-group"><i class="fa fa-circle"></i>${post.name}</span>
                                            <span class="status-infor"><i class="fa fa-circle"></i>${post.total_comments} 件</span>
                                            <span class="status-infor"><i class="fa fa-user"></i>${post.total_members} 人</span>
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </li>
                    `);
                } else {
                    $('#load-group').append(`
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-1" style="margin-right: 20px;padding-left: 5px;">
                                <a href="/users/${post.id_user}"><img src= "${avatar}"  alt="..." class="rounded-circle" width="50px" height="50px"></a>
                            </div>
                            <div class="col-10" style="padding: 0px;">
                                <a href="/private">
                                    <h6>${post.title}</h6>
                                    <time class="status-time-infor">${post.created_at}</time>
                                    <p class="par">${post.body}</p>
                                    <p>
                                        <span class="name-group"><i class="fa fa-circle"></i>${post.name}</span>
                                        <span class="status-infor"><i class="fa fa-circle"></i>${post.total_comments} 件</span>
                                        <span class="status-infor"><i class="fa fa-user"></i>${post.total_members} 人</span>
                                    </p>
                                </a>
                            </div>
                        </div>
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