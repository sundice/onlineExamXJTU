(function () {
    $(function () {
        var _paperInfo = Cookies.getJSON('PaperInfo');//试卷基本信息
        console.log(_paperInfo);
        var _paperPreview = Cookies.getJSON('PaperPreview');//组成试卷的题
        console.log(_paperPreview);
        var step = document.getElementById('step');
        var step_progress = step.getElementsByClassName('step-progress')[0];
        var step_item = step.getElementsByClassName('step-item');

        step_progress.style.width = '100%';
        step_item[1].className = 'step-item active';
        step_item[2].className = 'step-item active';
        step_item[3].className = 'step-item active';
        //给html各控件赋值
        $('#paperDescriptionSpan').html(_paperInfo.PaperRemarks);
        $('#paperTitleH4').prepend(_paperInfo.PaperName);
        $.each(_paperPreview, function (index, obj) {
            if (obj.QuestionType == 1) {
                var temp = '<div class="sc"><div class="item-type clearfix"><span class="pull-left">' + index + '.</span><span>【单选题】</span><span class="pull-right item-score">总分2 分</span><span class="pull-right mr20 text-gray"></span></div><div class="item-stem"><p>' + obj.QuestionContent + '：</p></div></div>';
                $('#ChoiceDiv').append(temp);
            } else if (obj.QuestionType == 2) {
                var temp = '<div class="sc"><div class="item-type clearfix"><span class="pull-left">' + index + '.</span><span>【判断题】</span><span class="pull-right item-score">总分2 分</span><span class="pull-right mr20 text-gray"></span></div><div class="item-stem"><p>' + obj.QuestionContent + '：</p></div></div>';
                $('#TFDiv').append(temp);
            }else if (obj.QuestionType == 3) {
                var temp = '<div class="sc"><div class="item-type clearfix"><span class="pull-left">' + index + '.</span><span>【填空题】</span></div><div class="item-stem"><p>' + obj.QuestionContent + '：</p></div></div>';
                $('#BlankDiv').append(temp);
            }else if (obj.QuestionType == 4) {
                var temp = '<div class="sc"><div class="item-type clearfix"><span class="pull-left">' + index + '.</span><span>【问答题】</span></div><div class="item-stem"><p>' + obj.QuestionContent + '：</p></div></div>';
                $('#QADiv').append(temp);
            }else if (obj.QuestionType == 5) {
                var temp = '<div class="sc"><div class="item-type clearfix"><span class="pull-left">' + index + '.</span><span>【编程题】</span></div><div class="item-stem"><p>' + obj.QuestionContent + '：</p></div></div>';
                $('#ProgramDiv').append(temp);
            }
        });





        $("#CompletePreStep").click(function () {
            document.location.href = abp.appPath + "Mpa/Test/BuildPaperMode";
        });
        $("#BrowsePaperStep").click(function () {
            document.location.href = abp.appPath + "Mpa/Paper/BrowsePaper";

        }); 
    });
})();