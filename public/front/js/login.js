/**
 * Created by 三界外的沉默 on 2017/11/14.
 */
$(function (){

    //1.给注册按钮注册单击事件
    $(".btn_login").on("click",function (){
        //获取用户名
        var username = $("[name='username']").val();
        //获取密码
        var password = $("[name='password']").val();

        if(!username){
            mui.toast("请输入用户名");
            return false;
        }

        if(!password){
            mui.toast('请输入密码');
            return false;
        }

        //发送ajax请求
        $.ajax({
            type:'post',
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            success:function (data){
                if(data.success){
                    //返回说明 success  注册成功   false 操作失败
                    //console.log(data);
                    //获取 retUrl参数,如果没有参数,直接跳转到会员中心 如果有,则跳转到指定页面
                    var search = location.serach;//获取参数
                    if(search.indexOf("retUrl") == -1){
                        //没有跳转到会员中心
                        location.href = "user.html";

                    }else{
                        //有的话就跳转到url对应的地址
                        srarch = search.replace("?retUrl=","");
                        location.href = search;
                    }

                }else if(data.error === 403 ){
                    //直接提示用户
                    mui.toast(data.message);
            }


        }
    });
  });
});