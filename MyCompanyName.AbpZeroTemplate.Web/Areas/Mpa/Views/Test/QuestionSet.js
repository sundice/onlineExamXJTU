(function () {
    $(function () {
        //Cookies.remove('dataArray');
        var ques = Cookies.getJSON('QuestionSet');//cookies中存放的备选题集
        console.log(ques);
        var _paperStrategyTable = $('#PaperStrategyTable');
        var dataArray;//table数据来源

        if (Cookies.getJSON('dataArray') == undefined) {
            dataArray = [];
        } else {
            dataArray = Cookies.getJSON('dataArray');
        }

        var step = document.getElementById('step');
        var step_progress = step.getElementsByClassName('step-progress')[0];
        var step_item = step.getElementsByClassName('step-item');

        step_progress.style.width = '50%';
        step_item[1].className = 'step-item active';

        window.operateEvents = {
            //将单元格的数据以参数的形式传到服务层
            "click #btn_browse": function (e, value, row, index) {
                document.location.href = abp.appPath + "Mpa/Test/QtypeInfo?courseName=" + row.CourseName + "&scope=" + row.Scope + "&knowledgePoint=" + row.KnowledgePoint + "&index=" + (index+1);

            },
            "click #btn_edit": function (e, value, row, index) {
                alert("shit");
            },
            "click #btn_delete": function (ID) {
                alert("delete");
                $('#PaperStrategyTable').bootstrapTable('remove', {
                    filed: 'ID',
                    value: ID
                });
            }
        }

        function tableInit() {
            _paperStrategyTable.bootstrapTable({
                    data: Cookies.getJSON('dataArray'),
                    cookie: true,
                    cookieIdTable: "questionSet",
                    toolbar: '#toolbar',                //工具按钮用哪个容器
                    striped: true,                      //是否显示行间隔色
                    pagination: true,                   //是否显示分页（*）
                    sortable: false,                     //是否启用排序
                    sortOrder: "asc",                   //排序方式
                    sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                       //初始化加载第一页，默认第一页
                    pageSize: 10,                       //每页的记录行数（*）
                    pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                    minimumCountColumns: 2,             //最少允许的列数
                    clickToSelect: true,                //是否启用点击选中行
                    height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                    columns: [{
                        field: 'ID',
                        title: '序号',
                        formatter: function (value, row, index) {
                            return index + 1;
                        }
                    }, {
                        field: 'CourseName',
                        title: '课程名'
                    }, {
                        field: 'Scope',
                        title: '章节'
                    }, {
                        field: 'KnowledgePoint',
                        title: '知识点'
                    }, {
                        field: 'Operate',
                        title: '题型分布情况',
                        events: operateEvents,
                        formatter: operateFormatter
                    }]

                });
        }
        tableInit();
        //添加点击事件
        $('#AddQuestionSetBtn').click(function (e) {
            e.preventDefault();
            var courseName = ($('#CourseNameSelect').val());
            var scope = ($('#ScopeSelect').val());
            var knowledgePoint = ($('#KnowledgePointSelect').val());

            var dataJson = { 'CourseName': courseName, 'Scope': scope, 'KnowledgePoint': knowledgePoint }; //define a new row data，certainly it's empty  
           
            dataArray.push(dataJson);
            //data cookie in js
            console.log(dataArray); 
            Cookies.set('dataArray', dataArray);
            //data cookie test
            var temp = Cookies.getJSON('dataArray');
            console.log(temp);
            //Cookies.remove('dataArray');
            $('#PaperStrategyTable').bootstrapTable('destroy');
            tableInit();
            //table cookie in bootstraptable test
            var cookieDetails = $('#PaperStrategyTable').bootstrapTable('getCookies');
            console.log(cookieDetails);
        });

        function operateFormatter(value, row, index) {
        return [
            '<button id="btn_browse" type="button" class="btn btn-default"><span class= "glyphicon glyphicon-search" aria-hidden="true"></span> 查看</button >',
            '<button id="btn_edit" type="button" class="btn btn-default"><span class= "glyphicon glyphicon-pencil" aria-hidden="true"></span > 修改</button >',
            '<button id="btn_delete" type="button" class="btn btn-default"><span class= "glyphicon glyphicon-remove" aria-hidden="true"></span > 删除</button >'

        ].join('');
    }



        $("#SetPreStep").click(function () {
            history.go(-1);
        });
        $("#SetNextStep").click(function () {
            document.location.href = abp.appPath + "Mpa/Test/BuildPaperMode";

        }); 
    });
})();