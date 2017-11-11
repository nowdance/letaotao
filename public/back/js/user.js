/**
 * Created by 三界外的沉默 on 2017/11/10.
 */

//函数
$(function (){
  //发送ajax请求,获取数据,根据模板渲染数据到页面
    var currentpage = 1;//记录当前页
    var pageSize = 5;//记录每页显示的数量

    //render ---渲染
    function render(){
      $.ajax({
          type: "get",
          url:"/user/queryUser",
          data:{
              page:currentpage,
              pageSize:pageSize
          },
          success:function (data){
            console.log(data);
             var html = template("tab1",data);
             $("tbody").html(html);

              //渲染分页
              $("#paginator").bootstrapPaginator({
                  bootstrapMajorVersion: 3, //指定版本 3.0以上必须指定
                  currentPage: currentpage,//指定当前显示的页面
                  totalPages: Math.ceil(data.total / pageSize),//总页数要总数据除以单页显示数量向上取整
                  size:"small",//设置控件大小
                  onPageClicked: function (event,originallEvent,type,page){
                      //插件提供2个事件 点击和改变事件
                      //page参数指点击的页码, then修改当前页
                      currentpage = page;
                      //重新渲染页面
                      render();
                  }
              });
          }
      })
    }

    render();

    //禁用启用功能,需要注册委托事件
    $("tbody").on("click",".btn",function (){
        //弹出模态框
        $("#userModal").modal("show");

        //获取当前按钮对应的id   自定属性data-id
        var id =  $(this).parent().data("id");
        //console.log(id);
        //获取是禁用状态还是启用状态,禁用状态发送0.否则发送1
        var isDelete = $(this).hasClass("btn-danger")?0:1;

        $(".btn_edit").off().on("click",function (){
          //发送ajax请求 首先off()解绑所有的点击事件
            //接口文档 用户模块 update-user 发送参数 id  isDelete     返回 success注册状态  error操作失败
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (data){
                  if(data.success){
                      //操作成功 关闭 模态框
                      $("#userModal").modal("hide");
                      //重新渲染页面
                      render()
                  }
                }
            });
        });
    });
});