$(function(){
    //发送ajax请求  获取个人信息
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        success:function(data){
            //console.log(data);
            //如果没有登录 ,跳转到登录页面
            if(data.error===400){
                location.href = "login.html";
            }

           //如果成功,渲染模板
            $(".userinfo").html(template("tp1",data));

           
        }
    });

    //点击退出按钮退出到登录页
    $(".lt_logout a").on("click",function(){

        //发送退出ajax请求
        $.ajax({
            type:"get",
            url:"/user/logout",
            success:function(data){
                if(data.success){
                    location.href= "login.html";
                }
            }
        });
    });
});