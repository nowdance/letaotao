/**
 * Created by 三界外的沉默 on 2017/11/11.
 */
$(function (){
  //二级分页数据渲染
    var currentPage =  1;//声明变量保存当前显示页 默认值为 1
    var pageSize = 5; //设置每个页面显示的数据数量

    function render(){
      $.ajax({
           type: "get",
           url:"/category/querySecondCategoryPaging",
           data: {
               page:currentPage,
               pageSize:pageSize
           },
          success: function(data){
              //console.log(data);
              $("tbody").html(template("tab3",data));

              //渲染分页
              $("#paginator").bootstrapPaginator({
                  bootstrapMajorVersion:3,
                  currentPage:currentPage,
                  totalPages:Math.ceil(data.total/pageSize),
                  onPageClicked:function (a,b,c, page) {
                      currentPage = page;
                      render();
                  }
              })
          }
      })
    }
    render();

    //点击添加按钮 弹出模态框 添加二级分类
    $(".btn_add").on("click",function (){
      $("#addModal").modal("show");

    })
})