$(function(){
    //1.实现发送验证码
    $(".btn_getcode").on("click",function(e){
        //阻止按钮默认跳转事件
        e.preventDefault();
        //默认要60s才可以点击一次.需求点击一次后禁用按钮
        //保存this的指向
         var $this = $(this);
        $(this).addClass("disabled").prop("disabled",true).val("正在发送中");


        //发送ajax请求
        $.ajax({
            type:"get",
            url:"/user/vcode",
            success:function(data){
                console.log(data.vCode);

               //开启倒计时,30s后用户可以再次点击
               var daojishi = 30;
              var timeId= setInterval(function(){
                   daojishi--;
                   $this.text(daojishi+"秒后再次发送");

                   //如果倒计时小于等于0时  按钮恢复 可以再次点击
                    if(daojishi <= 0){
                        $this.removeClass("disabled").prop("disabled",false).text("获取验证码");
                        //清除定时器
                        clearInterval(timeId);
                    }
               },1000);
            }
        })
    })

    //2.实现注册功能
        //思路 : 注册点击事件  获取表单数据 数据验证  验证成功 发送ajax请求  跳转user页面
       $(".btn-register").on("click",function(){
            //获取  表单数据
            var username = $("[name='username']").val();
            console.log(username);
            var password = $("[name='password']").val();
            var repassword = $("[name='repassword']").val();
            var mobile = $("[name='mobile']").val();
            var vcode = $("[name='vcode']").val();
            //表单校验
            if(!username){
                mui.toast("请输入用户名");
                return false;
            }
            if(!password){
                mui.toast("请输入密码");
                return false;
            }
            if(password != repassword){
                mui.toast("两次密码不一致");
                return false;
            }
            if(!mobile){
                mui.toast("请输入手机号码 ");
                return false;
            }
            if(!/^1[35678]\d(9)$/.text(mobile)){
                mui.toast("手机号码不正确");
                return false;
            }
            if(!vcode){
                mui.toast("请输入验证码");
                return false;
            }

            //发送ajax请求 
            $.ajax({
                type:"post",
                url:"/user/register",
                data:{
                    username:username,
                    password:password,
                    mobile:mobile,
                    vCode:vcode
                },
                success:function(data){
                    //console.log(data);
                    if(data.success){
                        mui.toast("恭喜,注册成功,一秒后跳转到登录页");
                        setInterval(function(){
                            location.href = "login.html";
                        },1000);
                    }else{
                        mui.toast(data.message);
                    }
                }
            });
       });
});