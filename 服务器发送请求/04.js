/*
    从服务器主动发送请求调用接口-编辑数据
*/

const http = require('http');
const querystring = require('querystring');

let options = {
    protocol : 'http:',
    hostname : 'localhost',
    port : 3000,
    path : '/books/book',
    method : 'put',
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}

let req = http.request(options,(res)=>{
    let info = '';

    res.on('data',(chunk)=>{
        info += chunk;
    });
    res.on('end',()=>{
        console.log(info);
    });
});

let data = querystring.stringify({
    id : 34,
    name : 'ddddddddd',
    author : 'sssssssss',
    category : 'eeeeeeeee',
    description : 'gggggggg'
});
req.write(data);
req.end();
