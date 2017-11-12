/**
 * Created by 三界外的沉默 on 2017/11/12.
 */
//区域滚动功能
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条,true 默认显示
    bounce: true //是否启用回弹
});

//轮播图自动播放
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});