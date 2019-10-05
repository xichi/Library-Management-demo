/* 
  业务模块
*/
const path = require('path');
const fs = require('fs'); 
const db = require('./db.js');

//渲染主页面
exports.allBooks = (req,res)=>{
  let sql = 'select * from book';
  db.base(sql,null,(result)=>{
     res.json(result);
  })
}

//添加图书
exports.addBook = (req,res)=>{
  let info = req.body;
  let sql = 'insert into book set ?';
  db.base(sql,info,(result)=>{
    if(result.affectedRows == 1){
      res.json({flag : 1});
    }
    else{
      res.json({flag : 2});
    }
  })
}

//编辑图书时id查询
exports.getBookById = (req,res)=>{
  let id = req.params.id;
  let sql = 'select * from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
    if(result.length != 0){
      //console.log(result);
      res.json(result[0]);
    }
  })
}
//编辑图书
exports.editBook = (req,res)=>{
  let info = req.body;
  let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
  let data = [info.name,info.author,info.category,info.description,info.id];
  db.base(sql,data,(result)=>{
    if(result.affectedRows == 1){
      res.json({flag : 1});
    }
    else{
      res.json({flag : 2});
    }
  })
}

//删除图书
exports.deleteBook = (req,res)=>{
  let id = req.params.id;
  let sql = 'delete from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
    //console.log(result);
    if(result.affectedRows == 1){
      res.json({flag : 1});
      //console.log(res)
    }else{
      res.json({flag : 2});
    } 
  }) 
}

//查询图书
exports.searchBook = (req,res)=>{
  
}

