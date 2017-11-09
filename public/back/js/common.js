/**
 * Created by 三界外的沉默 on 2017/11/8.
 */
//知识点 进度条插件
// jquery ajax全局事件6个

//关闭进度环
NProgress.configure({showSpinner:false})

//注册了全局事件，所有的ajax只要开始就会开启进度条
$(document).ajaxStart(function () {
    NProgress.start();
});

//所有的ajax只要结束，延迟500毫秒，结束进度条
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
});

//当页面一开始加载的时候 首先发送一个判断用户 是否登录的请求,true则不作任何反应,false就打回登录页面 接口文档
if(location.href.indexOf("login.html") == -1){
    $.ajax({
        type: "get",
        url:"/employee/checkRootLogin",
        success:function (data){
          if(data.error === 400){
              location.href = "login.html";
          }
        }
    });
}

//二级菜单点击显示 隐藏
$(".child").prev().on("click",function (){
  $(this).next().slideToggle();
});
//方式二
//$(".btn").on("click",function (){
//  console.log("呵呵")
//    $(this).find("div").slideToggle()
//})

//侧边栏显示隐藏
$(".btn_menu").on("click",function (){
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
})

//点击退出登录功能
$(".btn_logout").on("click",function (){
  $("#logoutModal").modal("show");
    //模态框的调用显示方法
    //on注册事件不会覆盖
    //off()解绑所有的事件
    //off("click") 只解绑click事件
    //off("click", "**"); 解绑委托事件
    $(".btn_confirm").off().on("click",function (){
      //给服务器发送ajax请求,让服务器清除session
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function (data){
              if(data.success){
                  location.href = "login.html";
              }
            }
        });
    });
});
