/**
 * Created by 三界外的沉默 on 2017/11/8.
 */
$(function (){
  //登录表单的验证
    //需求:
    //1.用户名不能为空
    //2.密码不能为空
    //3.密码长度为6-12位

    //获取到表单
    var $form = $("form");

    //调用bootstrapValidator校验表单
        //首先初始化获取validator对象或者实例
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },

                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度6-12位"
                    }
                }
            },
        }
    });

    //给表单注册一个校验成功事件 success.form.bv
    $form.on("success.form.bv",function (e){
        //阻止a标签默认跳转的行为
        e.preventDefault();

        //使用ajax发送登录请求
        $.ajax({
            type: "post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function (data){
              if(data.success){
                  //跳转到首页
                  location.href = "index.html";
              }
               if(data.error === 1000){
                   //alert("用户名不存在")
                   //使用updateStatus方法，主动把username这个字段变成校验失败
                   //第一个参数：字段名  表单中的name属性
                   //第二个参数：INVALID :校验失败
                   //第三个参数：配置提示消息
                   $form.data("bootstrapValidator").updateStatus("username","INVALID","callback")
               }
                if(data.error === 1001){
                    //手动让密码校验失败
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }
        });
    });

    //表单重置功能
    $("[type='reset']").on("click",function (){
        //获取到validator对象,调用resetForm方法
        $form.data("bootstrapValidator").resetForm();
    });
})