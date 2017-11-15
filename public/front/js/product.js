/**
 * Created by 三界外的沉默 on 2017/11/14.
 */
$(function (){
  //获取url中带过来的参数
    var productId = tools.getParam("productId");
        //console.log(productId);
    //发送ajax请求 获取商品详情
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id: productId
        },
        success: function(data){
            console.log(data); //拿到数据渲染模板
            $(".mui-scroll").html(template("tep1",data));

            //渲染完成后,需要重新初始化轮播图  具体参考mui文档 图片轮播
            mui(".mui-slider").slider({
                interval:1000 //设置自动轮播周期1s  设为0则为用户手动滑动
            });

            //选择的尺码 给按钮注册事件
            $(".lt_size span").off().on("click",function (){
              $(this).addClass("now").siblings().removeClass("now");
            });

            //手动初始化数字框   mui  数字输入框 numbox
            //文档规定动态添加的numbox 组件 需要手动初始化
             mui(".mui-numbox").numbox();
        }
    })

    //3.添加到购物车
    $('.btn_add_cart').on("click",function (){
      //发送ajax请求
        //发送请求时 需要带的参数为商品的尺码和数量 产品id

        //尺码
        var size = $(".lt_size span.now").html();
        if(!size){
            //如果没有 选择尺码则弹出提示框提醒用户选择商品尺码 并阻止下一步操作
            mui.toast("请选择商品的尺码");
            return false;
        }
        //用户选择的商品数量
        var num= $(".mui-numbox-input").val();

        //发送ajax
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:productId,
                size:size,
                num:num
            },
            success: function(data){
                //没有登录的话跳转到登录页面 error 400
                //成功的话 success   提示框提示用户是继续浏览还是去购物车 
                tools.checkLogin(data);
                if(data.success){
                    //添加成功
                    mui.confirm("添加商品成功","温馨提示",["去购物车","继续浏览"],function (e){
                        if(e.index === 0){
                            location.href = "cart.html";
                        }
                    });
                }
            }
        });
    });
});