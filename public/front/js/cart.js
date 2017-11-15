$(function(){
    //需求
    // 跳转到 该页面发送ajax请求获取购物车数据把那个渲染页面 
    //实现下拉刷新效果  --插件  需要初始化该插件 
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
            color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
            height:'50px',//可选,默认50px.下拉刷新控件的高度,
            range:'100px', //可选 默认100px,控件可下拉拖拽的范围
            offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback : function(){
                //发送ajax请求
                $.ajax({
                    type:"get",
                    url:"/cart/queryCart",
                    success:function(data){
                        //console.log(data);
                        setTimeout(function(){
                            tools.checkLogin(data);
                            $(".mui-table-view").html(template("tep1",{data:data}) );
                            $(".lt_total .total").html("00.00");
                            //结束下拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                        },1000);
                    }
                });
            }
          }
        }
      });

      
  //删除功能
  //1. 给删除按钮注册委托事件
  //2. 获取到当前购物车的id
  //3. 发送ajax请求，删除成功之后，重新渲染页面
  $(".lt_content").on("tap", ".btn_delete_cart", function () {
    
        //获取到当前的id
        var id = $(this).data("id");
    
        mui.confirm("您是否要删除这件商品?","温馨提示",["是","否"],function (e) {
          if(e.index === 0){
            //发送ajax请求
            $.ajax({
              type:"get",
              url:"/cart/deleteCart",
              data:{
                id:id
              },
              success:function (data) {
                if(data.success){
                  //成功之后，需要手动的下拉刷新一次
                  mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }
              }
            });
          }
        });
    
    
    
      });
    
    
    
    
      //编辑功能
      //1. 给编辑按钮注册点击事件
      //2. 获取到当前的id
      //3. 发送ajax请求，获取当前商品的详细的信息
      //4. 修改信息
      //5. 点击确定按钮，发送ajax请求，保存
      //6. 重新渲染
      $(".lt_content").on("tap", ".btn_edit_cart", function () {
    
        var data = this.dataset;
    
        //渲染一个模板，修改商品
        var html = template("tpl2", data);
        //去除html中所有的换行，
        html = html.replace(/\n/g, "");
    
        //显示confirm框
        mui.confirm(html,"编辑商品",["确定","取消"], function (e) {
          if(e.index === 0){
            //点击了确定按钮，获取参数，发送ajax请求
            var id = data.id;
            var size = $(".lt_edit_size span.now").html();
            var num =  $(".lt_edit_num .mui-numbox-input").val();
    
            $.ajax({
              type:"post",
              url:"/cart/updateCart",
              data:{
                id:id,
                size:size,
                num:num
              },
              success:function (data) {
                if(data.success){
                  //手动下拉刷新
                  mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                }
              }
            });
          }
        });
    
        //选择尺码，lt_edit_size下span注册
        $(".lt_edit_size span").on("tap", function () {
          $(this).addClass("now").siblings().removeClass("now");
        });
    
    
        //初始化数字框
        mui(".mui-numbox").numbox();
    
    
      });
    
    
    
      //给要所有的checkbox注册点击事件
      $(".lt_content").on("change", ".ck", function () {
    
        //获取到选中的checkbox
    
        //计算总金额
        var total = 0;
        $(".ck:checked").each(function () {
    
          //获取当前元素的价钱和数量。
          total += this.dataset.price * this.dataset.num;
    
        });
    
        //保留2位小数
        $(".lt_total .total").html(total.toFixed(2));
    
      });




})