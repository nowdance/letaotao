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