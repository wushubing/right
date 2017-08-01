/**
 * Created by wusb on 2017/7/27.
 */
$(document).ready(function () {
//    var data=Mock.mock('http://dfic.cn',{
//         'type|1-2':1,
//         'url': "@url()",
//         'num|1-10000':100
//     })
// });
// $('.firstbtn').click(function () {
//     comsole.log(56656546546);
//     $.ajax({
//         url:"http://dfic.cn",
//         dataType:"json",
//         async:true,
//         data:{},
//         type:"GET",
//         success:function (req) {
//             console.log(req);
//         },
//         error:function () {
//             console.log(100100)
//         }
//     })
// });
    var btntype1 = $('.typebtn>input:first');
    var btntype2 = $('.typebtn input:eq(1)');

    btntype1.click(function (e) {
        $('.cy').css("display","none");
        $('.xw').css("display","block");
    });
    btntype2.click(function (e) {
        $('.cy').css("display","block");
        $('.xw').css("display","none");
    });

    //ajax
    $(document).ready(function () {
        $.ajax({
            type:"GET",
            url:"legalData1.json",
            data:{},
            async:true,
            dataType:'json',
            success:function (data) {
                callback(data)
            },error:function () {
                console.log(error)
            }
        });
        function callback(data) {
            var result = eval(data);
            console.log(data);
            var Newstoplist =result.ndmtoplist;
            var Creativetoplist = result.cdmtoplist;
            var nxzdlist = result.nxzdlist;
            var cxzdlist = result.cxzdlist;
            var firstmatch = result.info1;
            var ourphotographer = result.info2;
            //新闻周目标域名匹配top10
            $('#begin').html(result.beginDate);
            $('#end').html(result.endDate);
            $.each(Newstoplist,function (i,result) {
                item1='<tr><td>'+Number(i+1)+'</td><td>'+result['domainname']+'</td><td>'+result['amount']+'</td></tr>';
                $('#newstoplist').append(item1);
            });
            //创意周目标域名匹配top10
            $.each(Creativetoplist,function (i,result) {
                item2='<tr><td>'+Number(i+1)+'</td><td>'+result['domainname']+'</td><td>'+result['amount']+'</td></tr>';
                $('#cretivetoplist').append(item2);
            });
            //新闻新增目标域名
            $.each(nxzdlist,function (j,result1) {
                item='<tr><td>'+'新闻'+'</td><td>'+result1['domainname']+'</td><td>'+result1['amount']+'</td></tr>';
                $('.zxzmbym1').append(item);
            });
            var pagination = UIkit.pagination($('.pagination3'), {
                items:nxzdlist.length,
                itemsOnPage: 7
            });
            $('.pagination3').on('select.uk.pagination', function(e, pageIndex){
                $('.zxzmbym1').find('tr').css("display","none");
                var pagemax = (pageIndex+1)*7;
                var pagemin = pageIndex * 7;
                for(var i = 0;i<=nxzdlist.length;i++) {
                    if(i>pagemin && i<=pagemax){
                        $('.zxzmbym1').find('tr').eq(i).css("display","table-row");
                    }else{
                        $('.zxzmbym1').find('tr').eq(i).css("display","none");
                    }
                }
            });
            //创意新增目标域名
            $.each(cxzdlist,function (j,result1) {
                item4='<tr><a><td>'+'创意'+'</td><td>'+result1['domainname']+'</td><td>'+result1['amount']+'</td></a></tr>';
                $('.zxzmbym2').append(item4);
            });
            var pagination = UIkit.pagination($('.pagination4'), {
                items: cxzdlist.length,
                itemsOnPage: 7
            });
            $('.pagination4').on('select.uk.pagination', function(e, pageIndex){
                $('.zxzmbym2').find('tr').css("display","none");
                var pagemax = (pageIndex+1)*7;
                var pagemin = pageIndex * 7;
                for(var i = 0;i<=cxzdlist.length;i++) {
                    if(i>pagemin && i<=pagemax){
                        $('.zxzmbym2').find('tr').eq(i).css("display","table-row");
                    }else{
                        $('.zxzmbym2').find('tr').eq(i).css("display","none");
                    }
                }
            });
            //周维权线索-第一次匹配
            $.each(firstmatch,function (i,result2) {
                item3='<tr><td><a>'+result2['info']+'</a></td></tr>';
                $('#zwqxs1').append(item3);
            });
            var pagination = UIkit.pagination($('.pagination1'), {
                items:firstmatch.length,
                itemsOnPage: 8
            });
            $('.pagination1').on('select.uk.pagination', function(e, pageIndex){
                $('#zwqxs1').find('tr').css("display","none");
                var pagemax = (pageIndex+1)*8;
                var pagemin = pageIndex * 8;
                for(var i = 0;i<=firstmatch.length;i++) {
                    if(i>pagemin && i<=pagemax){
                        $('#zwqxs1').find('tr').eq(i).css("display","block");
                    }else{
                        $('#zwqxs1').find('tr').eq(i).css("display","none");
                    }
                }
            });

                //周维权线索-自有摄影师
            $.each(ourphotographer,function (i,result2) {
                item5 ='<tr><td><a>'+result2['info']+'</a></td></tr>';
                $('#zwqxs2').append(item5);
            });
            var pagination = UIkit.pagination($('.pagination2'), {
                items:ourphotographer.length,
                itemsOnPage: 8
            });
            $('.pagination2').on('select.uk.pagination', function(e, pageIndex){
                $('#zwqxs2').find('tr').css("display","none");
                var pagemax = (pageIndex+1)*8;
                var pagemin = pageIndex * 8;
                for(var i = 0;i<=firstmatch.length;i++) {
                    if(i>pagemin && i<=pagemax){
                        $('#zwqxs2').find('tr').eq(i).css("display","block");
                    }else{
                        $('#zwqxs2').find('tr').eq(i).css("display","none");
                    }
                }
            });
            //各类图片匹配量
            var alltotal = result.allTotal;
            $('.mm1 .sumimg').html(alltotal.imgSum);
            $('.mm1 .szxz').html(alltotal.xinzeng);
            $('.mm2 .sumimg').html(alltotal.legalSum);
            $('.mm2 .szxz').html(alltotal.xinzengLegal);
            $('.mm3 .sumimg').html(alltotal.newsSum);
            $('.mm3 .szxz').html(alltotal.newsMatching);
            $('.mm4 .sumimg').html(alltotal.crtvSum);
            $('.mm4 .szxz').html(alltotal.crtvMatching);
            $('.mm5 .sumimg').html(alltotal.domainMatchingSum);
            $('.mm5 .sumimg1').html(alltotal.domainSum);
            $('.mm5 .szxz').html(alltotal.duibiDoamin);



            //新闻类周新增可维权匹配图表数据
            var chart1container = document.getElementById('chart1');
            //使echart可以适配屏幕大小
            var resizechart1container = function () {
                chart1container.style.width = chart1container.clientWidth+'px';
                chart1container.style.height = chart1container.clientHeight+'px';
            };
            resizechart1container();
            console.log(chart1container.style.width);
            var myChart = echarts.init(chart1container);
            var option = {
                tooltip: {
                    show:true
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: ["国外独家","自有摄影","百人万元","中超专线","标记独家","中超图片","金牌摄影","创意独家","国内摄影"],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel:{
                        interval:0
                    }
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: [],
                    label:{
                        normal:{
                            show: true,
                            position: 'top'
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.on('click', function (params) {
                window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            });

            var weeklegalMatch = result.xzlegalist;
            var crnum=[];
            var numbers=[];
            if(weeklegalMatch) {
                for(var i=0;i<weeklegalMatch.length;i++)
                    if(weeklegalMatch[i].newsOrCrtv == 1) {
                         numbers.push(weeklegalMatch[i].amount);
                    }else{
                        crnum.push(weeklegalMatch[i].amount);
                    }
            }
            myChart.setOption({
                series: [{
                    data: numbers
                }]
            });

         //创意类周新增可维权匹配情况
            var chart2container = document.getElementById('chart2');
            var resizechart2container = function () {
                chart2container.style.width = chart2container.clientWidth+'px';
                chart2container.style.height = chart2container.clientHeight+'px';
            };
            resizechart2container();
            var myChart1 = echarts.init(chart2container);
            var option1 = {
                tooltip: {
                    show:true
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: ["海外独家","国内签约","东方IC"],
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    barWidth:'50',
                    data: crnum,
                    label:{
                        normal:{
                            show: true,
                            position: 'top'
                        }
                    }
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option1);
            myChart1.on('click', function (params) {
                window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            });

            //分页

            $('[data-uk-pagination]').on('select.uk.pagination', function(e, pageIndex){

            });
        }
        var sortflag = 0;
        $('.sortbtn').click(function (e) {
            if(sortflag == 0) {
                $('.sortbtn img').attr("src","images/sort2.png");
                sortflag = 1;
            }else{
                $('.sortbtn img').attr("src","images/sort1.png");
                sortflag = 0;
            }
        })
    });

});