/**
 * Created by 三界外的沉默 on 2017/11/8.
 */
$(function (){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.pic_left'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年 注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月","7月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1100, 1200, 900, 2100, 2800, 1500,1300]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    var myChart1 = echarts.init(document.querySelector('.pic_right'));
    option = {
        title : {
            text: '热门 品牌销量',
            subtext: '2017年11月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','乔丹','NB','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'乔丹'},
                    {value:135, name:'NB'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart1.setOption(option);

})