(function () {
    $(function () {
        //Cookies.remove('QuestionSet');
        var _$qtypeInfoForm = $('#QtypeInfoForm');

        var _index = $('#IndexLabel').text();
        var _courseName = $('#CourseNameLabel').text();
        var _scope = $('#ScopeLabel').text();
        var _knowledgePoint = $('#KnowledgePointLabel').text();

        var _questionSet;//需要放到cookies中的所有备选题集
        if (Cookies.getJSON('QuestionSet') == undefined) {
            _questionSet = [];
        } else {
            _questionSet = Cookies.getJSON('QuestionSet');
        }

        var step = document.getElementById('step');
        var step_progress = step.getElementsByClassName('step-progress')[0];
        var step_item = step.getElementsByClassName('step-item');

        step_progress.style.width = '50%';
        step_item[1].className = 'step-item active';

        var _queryLabel = { CourseName: _courseName, Scope: _scope, KnowledgePoint: _knowledgePoint };

        $("#QtypeInfoSureStep").click(function () {
            var queryForm = _$qtypeInfoForm.serializeFormToObject();
            var queryFilter = $.extend(queryForm, _queryLabel);

            console.log(queryFilter);//queryFilter是json对象
            //需要用ajax方法才能拿到后台数据
            $.ajax({
                url: '/Mpa/Test/GetQuestionsByQtypeInfo',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
                data: queryFilter,//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
                type: 'GET',
                dataType: "json",//服务器返回的数据类型为json
                contentType: 'application/json;charset=utf-8',//数据类型必须有
                async: true,//异步
                success: function (data) //成功后的回调方法
                {//返回的data是一个json字符串[{},{},{}]
                    //$.each 方法遍历的是json对象，而非json字符串。当传入json字符串进行遍历的时候，就会报错： Cannot use 'in' operator to search for ...
                    _questionSet.push(JSON.parse(data));
                    console.log(_questionSet);

                    Cookies.set('QuestionSet', _questionSet);
                    var cookie = Cookies.getJSON('QuestionSet');
                    console.log(cookie);
                },
                error: function () {
                    alert("失败")//弹出框
                }
            });
            history.back(-1);
        });
        $("#QtypeInfoCancelStep").click(function () {
            document.location.href = abp.appPath + "Mpa/Test/QuestionSet";

        }); 

    });
})();