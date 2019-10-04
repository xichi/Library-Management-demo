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
                var html = template('indexTpl',{list : data});
                $('#dataList').html(html);
            }
        })
    }
    initList();

    //添加图书信息
    $('#btn-save').click(function(){
        console.log('111')
        console.log($('#form-save').serialize())
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
})