$(function () {
    var step = document.getElementById('step');
    var step_progress = step.getElementsByClassName('step-progress')[0];
    var step_item = step.getElementsByClassName('step-item');

    $("#IndexPreStrp").click(function () {
        document.location.href = abp.appPath + "Mpa/Paper";
    });
    $("#IndexNextStep").click(function () {
        step_progress.style.width = '50%';
        step_item[1].className = 'step-item active';

        $.ajax({
            url: '/Mpa/CreatePaper/QuestionSet',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
            data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
            type: 'POST',
            contentType: 'application/json;charset=utf-8',//数据类型必须有
            async: true,//异步
            success: function (data) //成功后的回调方法
            {
                $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                $.getScript("/Areas/Mpa/Views/CreatePaper/QuestionSet.js");
                $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

            },
            error: function () {
                alert("失败")//弹出框
            }

        });
    }); 

    $("#SetPreStep").click(function () {
        step_progress.style.width = '25%';
        step_item[1].className = 'step-item';
        $.ajax({
            url: '/Mpa/CreatePaper/PaperInfo',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
            data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
            type: 'POST',
            contentType: 'application/json;charset=utf-8',//数据类型必须有
            async: true,//异步
            success: function (data) //成功后的回调方法
            {
                $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

            },
            error: function () {
                alert("失败")//弹出框
            }

        });
    }); 
    $("#SetNextStep").click(function () {

        step_progress.style.width = '75%';
        step_item[2].className = 'step-item active';
        $.ajax({
            url: '/Mpa/CreatePaper/BuildPaperMode',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
            data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
            type: 'POST',
            contentType: 'application/json;charset=utf-8',//数据类型必须有
            async: true,//异步
            success: function (data) //成功后的回调方法
            {
                $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

            },
            error: function () {
                alert("失败")//弹出框
            }

        });
    }); 

    $("#QtypeInfoPreStep").click(function () {
        document.location.href = abp.appPath + "Mpa/CreatePaper";
    });
    $("#QtypeInfoNextStep").click(function () {
        document.location.href = abp.appPath + "Mpa/CreatePaper";
    });

    $("#ModePreStep").click(function () {
        step_progress.style.width = '50%';
        step_item[2].className = 'step-item';
        $.ajax({
            url: '/Mpa/CreatePaper/QuestionSet',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
            data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
            type: 'POST',
            contentType: 'application/json;charset=utf-8',//数据类型必须有
            async: true,//异步
            success: function (data) //成功后的回调方法
            {
                $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                $.getScript("/Areas/Mpa/Views/CreatePaper/QuestionSet.js");
                $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

            },
            error: function () {
                alert("失败")//弹出框
            }

        });
    }); 
    $("#ModeNextStep").click(function () {

        step_progress.style.width = '100%';
        step_item[3].className = 'step-item active';
        $.ajax({
            url: '/Mpa/CreatePaper/BuildPaperComplete',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
            data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
            type: 'POST',
            contentType: 'application/json;charset=utf-8',//数据类型必须有
            async: true,//异步
            success: function (data) //成功后的回调方法
            {
                $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

            },
            error: function () {
                alert("失败")//弹出框
            }

        });
    }); 

    $("#CompletePreStep").click(function () {
        step_progress.style.width = '75%';
        step_item[3].className = 'step-item';
        $.ajax({
            url: '/Mpa/CreatePaper/BuildPaperMode',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
            data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
            type: 'POST',
            contentType: 'application/json;charset=utf-8',//数据类型必须有
            async: true,//异步
            success: function (data) //成功后的回调方法
            {
                $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");

            },
            error: function () {
                alert("失败")//弹出框
            }

        });
    }); 
    $("#BrowsePaperStep").click(function () {
        document.location.href = abp.appPath + "Mpa/Paper/BrowsePaper?paperId=";
    }); 

})