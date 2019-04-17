(function () {
    $(function () {
        $.ajax({
            url: '/Mpa/Welcome/GetQuestionChart',
            type: 'get',
            dataType:'json',//服务器端返回的数据类型
            success: function (Data) {//服务器端返回的数据
                Datas = JSON.parse(Data.result);
                console.log(Datas);
                $('#QuestionChart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '题库统计'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                credits: {
                        enabled: false
                },
                series: [{
                    type: 'pie',
                    name: '占比',
                    data: switchData(Datas)
                }]
            });
            }
        });
         function switchData(data) {
            var Data = new Array();
             $.each(data, function (index, obj) {
                 if (obj.Key == 1) {
                     Data.push({ name: "选择题", y: obj.questionTypeCount, sliced: true, selected: true });
                 }
                 if (obj.Key == 2) {
                     Data.push(["判断题", obj.questionTypeCount]);
                 }
                 if (obj.Key == 3) {
                     Data.push(["填空题", obj.questionTypeCount]);
                 }
                 if (obj.Key == 4) {
                     Data.push(["问答题", obj.questionTypeCount]);
                 }
                 if (obj.Key == 5) {
                     Data.push(["编程题", obj.questionTypeCount]);
                 }
                 if (obj.Key == 6) {
                     Data.push(["综合题", obj.questionTypeCount]);
                 }
                 if (obj.Key == 7) {
                     Data.push(["编程题", obj.questionTypeCount]);
                 }
                
            })
             console.log(Data);
             return Data;
        }
    });
    $('#a_addQt').click(function (e) {
        e.preventDefault();
        document.location.href = abp.appPath + "Mpa/Question/CreateQuestion";
    });
    $('#a_addPp').click(function (e) {
        e.preventDefault();
        document.location.href = abp.appPath + "Mpa/CreatePaper";
    });
    $('#a_cdi').click(function (e) {
        e.preventDefault();
        document.location.href = abp.appPath + "Mpa/Candidate";
    });
    $('#a_maExam').click(function (e) {
        e.preventDefault();
        document.location.href = abp.appPath + "Mpa/Exam";
    });
})();