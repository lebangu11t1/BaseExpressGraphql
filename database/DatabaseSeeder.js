"use strict";

var con = require('../app/models/connection');
var faker = require('faker');
var dateTime = require('node-datetime');

//Seeder circle_types table
for(let i=0;i<10;i++) {
    let name = faker.name.jobType();
    let image = faker.image.imageUrl();
    let status = 1;
    let dt = dateTime.create();
    let created_at = dt.format('Y-m-d H:M:S');
    let color = faker.internet.color();

    con.query(`INSERT INTO circle_types (name,image,status,created_at,color) VALUES (' ${name}${i}',' ${image} ',1,'${created_at}','${color}')`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

//Seeder circle_posts table
for(let i=1;i<=3;i++) {
    let user_id = faker.random.number({min:1,max:60});
    let circle_type_id = faker.random.number({min:1,max:10});
    let title = faker.lorem.sentence();
    let body = faker.lorem.paragraph();
    let image = '{"origin":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/origin\/15029538367Wk57HIft5a8Mm8a.png","thumb":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/thumb\/15029538367Wk57HIft5a8Mm8a.png","status":0}';
    let required_approve = 0;
    let limits = faker.random.number({min:30,max:100});
    let total_members = faker.random.number({min:5,max:30});
    let total_comments = 21;
    let dt = dateTime.create();
    let created_at = dt.format('Y-m-d H:M:S');
    let stickers = '[{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337MIFB8YaQwrPw8ynl.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337MIFB8YaQwrPw8ynl.png"},{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337YOAfNYKGLmK7uhnP.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337YOAfNYKGLmK7uhnP.png"}]';
    let publish = 1;
    let counter_like = `{"most":[{"user_id":${user_id},"type":"2"}],"total":1}`;

    con.query(`INSERT INTO circle_posts (user_id,circle_type_id,title,body,image,required_approve,limits,total_members,total_comments,created_at,stickers,publish,counter_like) 
    VALUES (${user_id}, ${circle_type_id}, '${title}', '${body}', '${image}', ${required_approve}, ${limits}, ${total_members}, ${total_comments}, '${created_at}', '${stickers}', ${publish}, '${counter_like}')`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

for(let i=4;i<=100;i++) {
    let user_id = faker.random.number({min:1,max:60});
    let circle_type_id = faker.random.number({min:1,max:10});
    let title = faker.lorem.sentence();
    let body = faker.lorem.paragraph();
    let image = '{"origin":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/origin\/15029538367Wk57HIft5a8Mm8a.png","thumb":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/thumb\/15029538367Wk57HIft5a8Mm8a.png","status":0}';
    let required_approve = 1;
    let limits = faker.random.number({min:30,max:100});
    let total_members = faker.random.number({min:5,max:30});
    let total_comments = 21;
    let dt = dateTime.create();
    let created_at = dt.format('Y-m-d H:M:S');
    let stickers = '[{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337MIFB8YaQwrPw8ynl.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337MIFB8YaQwrPw8ynl.png"},{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337YOAfNYKGLmK7uhnP.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337YOAfNYKGLmK7uhnP.png"}]';
    let publish = 1;
    let counter_like = `{"most":[{"user_id":${user_id},"type":"2"}],"total":1}`;

    con.query(`INSERT INTO circle_posts (user_id,circle_type_id,title,body,image,required_approve,limits,total_members,total_comments,created_at,stickers,publish,counter_like) 
    VALUES (${user_id}, ${circle_type_id}, '${title}', '${body}', '${image}', ${required_approve}, ${limits}, ${total_members}, ${total_comments}, '${created_at}', '${stickers}', ${publish}, '${counter_like}')`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

//Seeder circle_post_comment table
for(let i=1;i<=100;i++) {
    let user_id = faker.random.number({min:1,max:60});
    let circle_post_id = i;
    let parent_id = null;
    let title = faker.lorem.sentence();
    let body = faker.lorem.sentence();
    let images = '{"origin":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/origin\/15029538367Wk57HIft5a8Mm8a.png","thumb":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/thumb\/15029538367Wk57HIft5a8Mm8a.png","status":0}';
    let stickers = '[{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337MIFB8YaQwrPw8ynl.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337MIFB8YaQwrPw8ynl.png"},{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337YOAfNYKGLmK7uhnP.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337YOAfNYKGLmK7uhnP.png"}]';
    let counter_like = `{"most":[{"user_id":${user_id},"type":"2"}],"total":1}`;
    let total_reply = 20;
    let total_comments = 20;
    let total_like = faker.random.number({min:5,max:60});
    let dt = dateTime.create();
    let created_at = dt.format('Y-m-d H:M:S');
    
    con.query(`INSERT INTO circle_post_comments (user_id,circle_post_id,parent_id,title,body,images,stickers,counter_like,total_reply,total_comments,total_like,created_at) 
    VALUES (${user_id}, ${circle_post_id}, ${parent_id}, '${title}','${body}', '${images}', '${stickers}', '${counter_like}', ${total_reply}, ${total_comments}, ${total_like}, '${created_at}')`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

for(let i=1;i<=100;i++) {
    for(let j=1;j<=20;j++) {
        let user_id = faker.random.number({min:1,max:60});
        let circle_post_id = i;
        let parent_id = i;
        let title = faker.lorem.sentence();
        let body = faker.lorem.sentence();
        let images = '{"origin":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/origin\/15029538367Wk57HIft5a8Mm8a.png","thumb":"https:\/\/s3-ap-northeast-1.amazonaws.com\/vn-app\/uploads\/images\/circle\/posts\/thumb\/15029538367Wk57HIft5a8Mm8a.png","status":0}';
        let stickers = '[{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337MIFB8YaQwrPw8ynl.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337MIFB8YaQwrPw8ynl.png"},{"id":"1","origin":"uploads\/images\/stickers\/1\/origin\/1478601337YOAfNYKGLmK7uhnP.png","thumb":"uploads\/images\/stickers\/1\/thumb\/1478601337YOAfNYKGLmK7uhnP.png"}]';
        let counter_like = `{"most":[{"user_id":${user_id},"type":"2"}],"total":1}`;
        let total_reply = 0;
        let total_comments = 0;
        let total_like = faker.random.number({min:5,max:30});
        let dt = dateTime.create();
        let created_at = dt.format('Y-m-d H:M:S');
        
        con.query(`INSERT INTO circle_post_comments (user_id,circle_post_id,parent_id,title,body,images,stickers,counter_like,total_reply,total_comments,total_like,created_at) 
        VALUES (${user_id}, ${circle_post_id}, ${parent_id}, '${title}','${body}', '${images}', '${stickers}', '${counter_like}', ${total_reply}, ${total_comments}, ${total_like}, '${created_at}')`, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
        });
    }
}
