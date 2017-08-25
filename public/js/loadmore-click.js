$(document).ready(function () {
    //おすすめサークル
    var offset = 0;
    $('#wait-a').css("display", "none");
    $('.card-load-a').css("display", "initial");
    $('.card-load-a').click(function () {
        offset = offset + 10;
        $('#wait-a').css("display", "initial");
        $('.card-load-a').css("display", "none");
        $.ajax({
            url: '/loadmore/club/'+offset,
            type: 'GET',
        })
        .done(function(data) {
            $('#wait-a').css("display", "none");
            if (offset >= (data[0][0].total_records - 10)) {
                $('#area-load-a').css("display", "none");
            } else {
                $('.card-load-a').css("display", "initial");
            }
           
            var avatar = '/assets/image/default-user.jpg';
            data[1].forEach(function(post) {
                if (post.avatar!=null) {
                    avatar = JSON.parse(post.avatar).thumb;
                }
                if (post.required_approve == 1) {
                    $('#circle-top').append(`
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
                    $('#circle-top').append(`
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
    });

    //人気のサークル
    var offset_middle_a = 0;
    $('#wait-b').css("display", "none");
    $('.card-load-b').css("display", "initial");
    $('.card-load-b').click(function () {
        offset_middle_a = offset_middle_a + 10;
        $('#wait-b').css("display", "initial");
        $('.card-load-b').css("display", "none");
        $.ajax({
            url: '/loadmore/club/'+offset_middle_a,
            type: 'GET',
        })
        .done(function(data) {
            $('#wait-b').css("display", "none");
            if (offset_middle_a >= (data[0][0].total_records - 10)) {
                $('#area-load-b').css("display", "none");
            } else {
                $('.card-load-b').css("display", "initial");
            }
           
            var avatar = '/assets/image/default-user.jpg';
            data[1].forEach(function(post) {
                if (post.avatar!=null) {
                    avatar = JSON.parse(post.avatar).thumb;
                }
                
                if (post.required_approve == 1) {
                    $('#circle-middle-a').append(`
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
                    $('#circle-middle-a').append(`
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
    });

    //殿堂入り
    var offset_middle_b = 0;
    $('#wait-c').css("display", "none");
    $('.card-load-c').css("display", "initial");
    $('.card-load-c').click(function () {
        offset_middle_b = offset_middle_b + 10;
        $('#wait-c').css("display", "initial");
        $('.card-load-c').css("display", "none");
        $.ajax({
            url: '/loadmore/club/'+offset_middle_b,
            type: 'GET',
        })
        .done(function(data) {
            $('#wait-c').css("display", "none");
            if (offset_middle_b >= (data[0][0].total_records - 10)) {
                $('#area-load-c').css("display", "none");
            } else {
                $('.card-load-c').css("display", "initial");
            }
           
            var avatar = '/assets/image/default-user.jpg';
            data[1].forEach(function(post) {
                if (post.avatar!=null) {
                    avatar = JSON.parse(post.avatar).thumb;
                }
                
                if (post.required_approve == 1) {
                    $('#circle-middle-b').append(`
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
                    $('#circle-middle-b').append(`
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
    });

    //すべての新着サークル
    var offset_bottom = 0;
    $('#wait-d').css("display", "none");
    $('.card-load-d').css("display", "initial");
    $('.card-load-d').click(function () {
        offset_bottom = offset_bottom + 10;
        $('#wait-d').css("display", "initial");
        $('.card-load-d').css("display", "none");
        $.ajax({
            url: '/loadmore/club/'+offset_bottom,
            type: 'GET',
        })
        .done(function(data) {
            $('#wait-d').css("display", "none");
            if (offset_bottom >= (data[0][0].total_records - 10)) {
                $('#area-load-d').css("display", "none");
            } else {
                $('.card-load-d').css("display", "initial");
            }
           
            var avatar = '/assets/image/default-user.jpg';
            data[1].forEach(function(post) {
                if (post.avatar!=null) {
                    avatar = JSON.parse(post.avatar).thumb;
                }
                
                if (post.required_approve == 1) {
                    $('#circle-bottom').append(`
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
                    $('#circle-bottom').append(`
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
    });
});