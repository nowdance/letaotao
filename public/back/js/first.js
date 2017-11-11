/**
 * Created by 三界外的沉默 on 2017/11/10.
 */
//准备入口函数
$(function (){

    //发送ajax,获取一级分类的数据
    var currentPage = 1; //声明当前显示页面为第一页
    var pageSize = 5; //声明每页显示的数据条数

    //渲染数据  --接口文档 分类模块query-top-category-paging
    function render(){
      $.ajax({
          type: "get",
          url: "/category/queryTopCategoryPaging",
          //参数 page  pageSize  必须参数
          data:{
              page: currentPage,
              pageSize: pageSize
          },
          success:function (data){
              console.log(data);
              $("tbody").html(template("tab2",data));

              //初识话分页控件
              $("#paginator").bootstrapPaginator({
                  bootstrapMajorVersion: 3,
                  currentPage: currentPage,
                  totalPages: Math.ceil(data.total / pageSize),
                  onPageClicked:function (event, originalEvent, type, page){
                    //修改成当前页
                      currentPage = page;
                      //重新渲染页面
                      render();
                  }
              });
          }
      })
    }
    render();

    //添加显示模态框
    $(".btn_add").on("click",function (){
      $("#addModal").modal("show");
    });

    //表单校验 表单校验插件 bootstrapvalidator插件
    var $form = $("form");
    //获取的是BootstrapValidator的实例，可以直接调用其方法
    $form.bootstrapValidator({
        //小图标 http://blog.csdn.net/nazhidao/article/details/51542508  启用禁用按钮
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            }
        }
    });

    //注册表单校验成功事件成功之后发送ajax请求  当提交按钮的[type=”submit”]时 会在success之前自动触发表单验证
    $form.on("success.form.bv",function (e){
      //阻止默认提交
        e.preventDefault();

        //使用ajax提交
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data: $form.serialize(),//serialize() 方法通过序列化表单值，创建 URL 编码文本字符串。
            success: function (data){
                //返回参数 success  error
                if(data.success){
                    //隐藏模态框
                    $("#addModal").modal("hide");
                    //重新渲染第一页 因为添加数据最新 数据显示在 第一页
                    currentPage = 1;
                    render();

                    //重置模态框,方便-下一次使用
                    //获取表单校验实例 重置校验的样式

                    $form.data("bootstrapValidator").resetForm();
                    //重置表单数据
                    $form[0].reset();
                    //jquery对象是dom对象的封装 是一个伪数组
                }
            }
        });
    });

})