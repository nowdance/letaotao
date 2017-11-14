/**
 * Created by 三界外的沉默 on 2017/11/13.
 */
$(function (){
  //封装获取本地暂存数据函数
    function getHistory(){
        //1.首先获取localStorage记录,获取时发现没有这条记录则默认为一个空数组
        var history = localStorage.getItem("lt_search_history") || '[]';
        //字符串转换成数组 返回此数组
        console.log(history);
        return JSON.parse(history);

    }
    function render(){
      //渲染搜索历史列表
        //1.获取搜索历史数据
        var arr = getHistory();
        console.log(arr);
        //使用模板渲染出来
        var html =  template("tp1",{arr:arr});
        //console.log(html);
        $(".lt_history").html(html);
    }

    //页面加载渲染一次
    render();

    //清空操作
    $(".lt_history").on("click",".btn_empty",function (){
        //mui 的确认框方法及参数 .confirm(message,title,btnValue,calllback)
        // message  对话框上显示的内容
        //title  对话框上显示的标题
        //提示对话框上按钮显示 的内容
        ///对话框关闭后的回调函数

      mui.confirm("您确定要清空历史记录吗?","温馨提示",["取消","确定"],function (e){
          if(e.index === 1){
              //1.删除lt_search_history
              localStorage.removeItem("lt_search_history");
              //重新渲染
              render();
          }
      });
    });

    //删除操作
    $(".lt_history").on("click",".btn_delete",function (){
        var $this = $(this);
        mui.confirm("您确定要删除这条历史吗?","温馨提示",["否","是"],function (e){
            if(e.index === 1){
                //获取下标
                var index = $this.data('index');
                //获取历史记录
                var arr = getHistory();
                //删除数组的对应下标
                //pop()删除的最后一个 shift()删除第一个
                //push()最后添加一个 unshift()最前面添加 一个
                // slice()截取数组-不改变原数组生成新数组
                //splice()拼接数组-改变原数组
                arr.splice(index,1);
                //console.log(arr);
                //重新设置lt_searcch_history
                localStorage.setItem("lt_search_history",JSON.stringify(arr));
                //重新渲染
                render();
            }
        })
    });

    //增加操作
    $(".lt_search  button").on("click",function (){
      //清除两边空格
        var key = $(".lt_search input").val().trim();
        //清空原来的记录
        $(".lt_search input").val("");
        if(key === ""){
            mui.toast("请输入搜索内容"); //mui.toast() 自动消失的提示框
            return false;
        }

        //获取历史记录
        var arr = getHistory();
        //添加到历史记录中的第一位
        //判断key 在数组中是否存在,如果存在 ,删除原数组中的key
        var index = arr.indexOf(key);//获取key在arr中第一次出现的索引
        if(index != -1){
            //没有找到返回-1 即代表数组中有相同的  删除原数组中的值
            arr.splice(index,1);
        }
        //如果数组的长度>=10,删除最后一个
        if(arr.length >= 10){
            arr.pop();
        }
        //不管怎样,都要添加数据到 第一行
        arr.unshift(key);

        //重新存储到缓存记录中
        localStorage.setItem("lt_search_history",JSON.stringify(arr));

        //重新渲染
        render();

        //让页面跳转到搜索结果 页面,并把搜索的内容传递过去
        location.href = "searchList.html?key="+key;
    });
});