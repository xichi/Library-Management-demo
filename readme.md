# Library-Management-System

 图书馆管理系统

node初次尝试，简单的练手项目（实现基于:bulb:数据库的增删改查）

前端：express + bootstrap + art-template  
数据库：mysql + phpStudy + Navicat Premium

## 1.前端渲染与后端渲染

在学习node的时候，使用了三种方式渲染数据：

1. data文件

   每次修改都要重头修改data文件:poop:

2. 后端渲染

   前端请求，后端用后台模板引擎直接生成html，前端接受到数据之后，直接插入页面。

3. 前端渲染（restful接口):thumbsup:

   后端返回JSON数据，前端利用预先写的html模板，循环读取JSON数据，拼接字符串（es6的模板字符串特性大大减少了拼接字符串的的成本），并插入页面。

   前端代码量变大，以前在后台处理的交互逻辑交给了前端处理。而且现在呈现前后端分离趋势:dizzy:，比较推荐这种方式。

<br/>
<br/>
<br/>

## 2.常用MySQL语句

使用数据库，就不得不提到老少咸宜的MySQL了~~  
以下增删改查常用MySQL语句:

>
>增：insert
>
>删：delete
>
>改：update
>
>查：SELECT或者show
>

增删改查实例：

>
>增：
>
>```mysql
>insert into book set ?
>```
>
>删：
>
>```mysql
>delete from book where id=?
>```
>
>改：
>
>```mysql
>update book set name=?,author=?,category=?,description=? where id=?
>```
>
>查：
>
>```mysql
>select * from book where name='张三流浪记';
>```
>

<br/>
<br/>
<br/>

## 3.ajax请求

### (1).常见四种请求方式

+ GET  
  GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据.
+ POST  
  POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用.
+ PUT  
  PUT方法用请求有效载荷替换目标资源的所有当前表示。
+ DELETE  
  DELETE方法删除指定的资源。

### (2).GET和POST的区别

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。然而，在以下情况中，请使用 POST 请求：

+ 无法使用缓存文件（更新服务器上的文件或数据库）
+ 向服务器发送大量数据（POST 没有数据量限制）
+ 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
  
<br/>
<br/>
<br/>

## 4.Express响应常用的三种api

+ res.send([body])  
  发送HTTP响应。所述body参数可以是一个Buffer对象，一个String，对象，或一个Array

  ```js
  res.send({hello:"word"});
  header： 'content-type': 'application/json'
  body：{ hello: 'word' }

  res.send(helloword);
  header： 'text/html; charset=utf-8'body：helldworld
  body：helldworld(postman 及浏览器测试)

  res.send(new Buffer('helloworld'));
  header：'application/octet-stream'
  body：<Buffer 68 65 6c 6c 6f 77 6f 72 6c 64>

  res.send(["hello","word"]);
  header： 'content-type': 'application/json'
  body：[ 'hello', 'word' ]
  ```

+ res.json([body])  
  发送JSON响应。该方法res.send()与将对象或数组作为参数相同。 即**res.json()就是 res.send([body])第三种情况。同样 ‘content-type’: ‘application/json’。** 此方法发送响应（具有正确的内容类型），该响应是使用JSON.stringify（）转换为JSON字符串的参数
+ res.end([data] [, encoding])  
  用于快速结束没有任何数据的响应。
  
> 我之前遇到了一个难解的问题：
>
> 做删除操作时，发送delete请求时状态码是200（成功），数据库中的数据也成功删除。但是ajax却跳入error。
>
> 一开始以为前端部分做数据请求时写错了，后来发现是 **后端部分** 出现纰漏。
>
> ```js
>  //前端ajax请求
>     function deleteBook(id){
>         $.ajax({
>             type : 'delete',
>             url : '/books/book/' + id,
>             dataType : 'json',
>             success : function(data){
>                 if(data.flag == '1'){         //原先直接跳入error了
>                     initList();
>                 }
>             },
>         })
>     }
> ```
>
> 
>
> ```js
> //后端数据库处理
> exports.deleteBook = (req,res)=>{
>   let id = req.params.id;
>   let sql = 'delete from book where id=?';
>   let data = [id];
>   db.base(sql,data,(result)=>{
>     // 修改前
>     // if(result.affectedRows == 1)     res.json(result[0]);
>     //修改后
>     if(result.affectedRows == 1){
>       res.json({flag : 1});
>     }else{
>       res.json({flag : 2});
>     } 
>   }) 
> }
> ```
>
>  通过打印发现result[0]是undefined。原来我向response传入了一个undefined，ajax才会跳入error。而我之所以res.json(result[0])，是从我之前写修改操作时的代码直接复制粘贴过来的。
> 
> 结论：复制粘贴核心代码而不深入理解，很有可能就是bug的源头哦~
>

