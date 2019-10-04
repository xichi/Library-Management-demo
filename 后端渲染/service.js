/* 
  业务模块
*/
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

//渲染主页面
exports.showIndex = (req,res)=>{
  let sql = 'select * from book';
  db.base(sql,null,(result)=>{
   res.render('index',{list : result});
  })
}

//添加图书
exports.toAddBook = (req,res)=>{
  res.render('addBook',{});
}
exports.addBook = (req,res)=>{
  let info = req.body;
  let book = {};
  for(let key in info)  book[key] = info[key];
  let sql = 'insert into book set ?'
  db.base(sql, book, (result)=>{
     if(result.affectedRows == 1){
       res.redirect('/');
     }
  })
}

//编辑图书
exports.toEditBook = (req,res)=>{
  let id = req.query.id;
  let sql = 'select * from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
     res.render('editBook',result[0]);
  })
}
exports.editBook = (req,res)=>{
  let info = req.body;
  let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
  let data = [info.name,info.author,info.category,info.description,info.id];
  db.base(sql, data, (result)=>{
     if(result.affectedRows == 1) res.redirect('/');
  })
}

// 删除图书信息
exports.deleteBook = (req,res) => {
  let id = req.query.id;
  let sql = 'delete from book where id=?';
  let data = [id];
  db.base(sql, data, (result)=>{
     if(result.affectedRows == 1)  res.redirect('/');
  })
}

//查询图书
exports.toSearchBook = (req,res)=>{
  res.render('searchBook',{});
}
exports.searchBook = (req,res)=>{
  let book = req.query;
  let sql = 'select * from book where ';
  let noneResults = '';
  let data = [];
  if(book.name != ''){
    sql += 'name=?';
    data.push(book.name);
  }
  else if(book.author != ''){
    sql += 'author=?';
    data.push(book.author);
  }
  else if(book.category != ''){
    sql += 'category=?';
    data.push(book.category);
  }
  else{
    noneResults = '查询条件为空';
    res.render('searchBook',{noneResults: noneResults});
    return;
  }
  db.base(sql, data, (result)=>{
      if(result.length != 0)   res.render('searchBook',{searchResults: result});
      else{
        noneResults = '暂无查询记录';
        res.render('searchBook',{noneResults: noneResults});
      }   
  })
} 
