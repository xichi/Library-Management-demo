
/* 
  拿到后台数据，并处理数据
*/

$(function(){
    //初始化数据列表
    function initList(){
        $.ajax({
            type : 'get',
            url : '/books',
            dataType : 'json',
            success : function(data){
                //渲染数据类型
                var html = template('indexTpl',{list : data});
                $('#dataList').html(html);
                //必选在渲染完成内容后才可以执行DOM操作
                $('#dataList').find('tr').each(function(index,element){
                   var td = $(element).find('td:eq(5)');
                   var id = $(element).find('td:eq(0)').text();
                   //添加操作
                   addBook();
                   //编辑操作
                   td.find('button:eq(0)').click(function(){   
                        editBook(id);
                   });
                   //删除操作 
                   td.find('button:eq(1)').click(function(){   
                        deleteBook(id);
                   //重置表单
                   $('#form-save').get(0).reset();
                   $('#form-save').find('input[type=hidden]').val('');
                });
                });
            }
        })
    }
    initList();

    //添加图书信息
    function addBook(){
        $('#btn-save').unbind('click').click(function(){
            $.ajax({
                type : 'post',
                url : '/books/book',
                data : $('#form-save').serialize(),
                dataType : 'json',
                success : function(data){
                    if(data.flag == '1'){
                        initList();
                    }
                }
            })  
        })
    }

    //删除图书信息
    function deleteBook(id){
        $.ajax({
            type : 'delete',
            url : '/books/book/' + id,
            dataType : 'json',
            success : function(data){
                initList();
            },
            error : function() {
                initList();
               console.log('请求失败');
            },
        })
    }

    //修改图书信息
    function editBook(id){
        $.ajax({
          type : 'get',
          url : '/books/book/' + id,
          dataType : 'json',
          success: function(data){
            var form = $('#form-save');
            form.find('input[name=id]').val(data.id);
            form.find('input[name=name]').val(data.name);
            form.find('input[name=author]').val(data.author);
            form.find('input[name=category]').val(data.category);
            form.find('input[name=description]').val(data.description);
            $('#btn-save').unbind('click').click(function(){
                $.ajax({
                    type : 'put',
                    url : '/books/book/',
                    data : form.serialize(),
                    dataType : 'json',
                    success : function(data){
                        if(data.flag == '1'){
                            initList();
                        }
                    }
                })
            })
          }
        })
    }
})