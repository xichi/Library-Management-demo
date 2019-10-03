# Library-Management-System

 图书馆管理系统

node初次尝试，简单的练手项目（实现基于:bulb:数据库的增删改查）

前端：express + bootstrap + art-template  
数据库：phpStudy + Navicat Premium

## 1.前端渲染与后端渲染

在学习node的时候，使用了三种方式渲染数据：

1. data文件

   每次修改都要重头修改data文件:poop:

2. 后端渲染

   前端请求，后端用后台模板引擎直接生成html，前端接受到数据之后，直接插入页面。

3. 前端渲染（restful接口):thumbsup:

   后端返回JSON数据，前端利用预先写的html模板，循环读取JSON数据，拼接字符串（es6的模板字符串特性大大减少了拼接字符串的的成本），并插入页面。

   前端代码量变大，以前在后台处理的交互逻辑交给了前端处理。而且现在呈现前后端分离趋势:dizzy:，比较推荐这种方式。

## 2.常用MySQL语句

增删改查常用MySQL语句:

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
>insert into employee(id,name) values(6,'张三');
>```
>
>删：
>
>```mysql
>delete from employee where job='ccc';
>```
>
>改：
>
>```mysql
>update employee set salary = 4000,job='ccc' where name='张三';
>```
>
>查：
>
>```mysql
>select * from student where name='张三';
>```
>