(function () {
    $(function () {
        var step = document.getElementById('step');
        var step_progress = step.getElementsByClassName('step-progress')[0];
        var step_item = step.getElementsByClassName('step-item');

        step_progress.style.width = '75%';
        step_item[1].className = 'step-item active';
        step_item[2].className = 'step-item active';

        $("#AICreatePaper").click(function () {
            $.ajax({
                url: '/Mpa/Test/AICreatePaper',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
                data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
                type: 'POST',
                contentType: 'application/json;charset=utf-8',//数据类型必须有
                async: true,//异步
                success: function (data) //成功后的回调方法
                {
                    $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                    //$.getScript("/Areas/Mpa/Views/Test/BuildPaperByAI.js");
                    //$.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

                },
                error: function () {
                    alert("失败")//弹出框
                }
            });
        });
        $("#ManualCreatePaper").click(function () {
            $.ajax({
                url: '/Mpa/Test/ManualCreatePaper',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
                data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
                type: 'POST',
                contentType: 'application/json;charset=utf-8',//数据类型必须有
                async: true,//异步
                success: function (data) //成功后的回调方法
                {
                    $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                    $.getScript("/Areas/Mpa/Views/Test/BuildPaperByManual.js");
                },
                error: function () {
                    alert("失败")//弹出框
                }

            });
        });

        $("#ModePreStep").click(function () {
            history.back(-1);
        });
        $("#ModeNextStep").click(function () {
            var _paperPreview =$('#QuestionsManualTable').bootstrapTable('getSelections');
            if (_paperPreview.length == 0) {
                abp.message.info('您还没有选择试题哦');
            } else {
                Cookies.set('PaperPreview', _paperPreview);
                console.log(_paperPreview);
                document.location.href = abp.appPath + "Mpa/Test/BuildPaperComplete";
            }

        }); 
    });
})();