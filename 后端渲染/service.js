/* 
  业务模块
*/
const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

//自动生成图书编号
let maxBookCode = ()=>{
  let arr = [];
  data.forEach((item)=>{
      arr.push(item.id)
  });
  return Math.max.apply(null,arr)   //求arr中的id最大值
}

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
   let bookList = [];
   let flag = 0;
   data.forEach((item)=>{
   for(let key in item){
      if(book[key] == item[key]){
        bookList.push(item);
        flag = 1;
        break;
      }
    }
    if(flag){
      return;
    }   
   })
  res.render('searchBook',{searchResults: bookList});
} 
