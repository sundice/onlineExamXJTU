(function () {
    $(function () {
        var _questionsTable = $('#QuestionsManualTable');
        var _questionSetCookie = Cookies.getJSON('QuestionSet');

        var _questionSet = [];//table数据来源
        console.log(_questionSetCookie);//备选题集

        $.each(_questionSetCookie, function (index, obj) {
            $.each(obj, function (index, obj1) {
                _questionSet.push(obj1);
            });
        });
        console.log(_questionSet);

        window.operateEvents = {
            "click #EditQuestionA": function (e, value, row, index) {
                alert("shit");
            },"click #ChangeScore": function (e, value, row, index) {
                alert("shit");
            },
            "click #ViewQuestionDetail": function (e, value, row, index) {
                alert("shit");
            }
        }


        function tableInit() {
            _questionsTable.bootstrapTable({
                data: _questionSet,
                cookie: true,
                cookieIdTable: "questionSetByManual",
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
                uniqueId: "Id",                     //每一行的唯一标识，一般为主键列
                columns: [{
                    checkbox: true
                }, {
                    field: 'Id',
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;   
                    }
                }, {
                    field: 'QuestionContent',
                        title: '题目内容',
                    width:850
                }, {
                    field: 'QuestionType',
                    title: '题型',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return value = "选择题";
                        } else if (value == 2) {
                            return value = "判断题";
                        }else if (value == 3) {
                            return value = "填空题";
                        }else if (value == 4) {
                            return value = "问答题";
                        }else if (value == 5) {
                            return value = "编程题";
                        }    
                    }
                }, {
                    field: 'Score',
                    title: '分数',
                    formatter:scoreFormatter
                }, {
                    field: 'Operate',
                    title: '操作',
                    events: operateEvents,
                    formatter: operateFormatter
                }]

            });
        }
        tableInit();

        function scoreFormatter(value) {

            return value = 2;
            //return '<input type="number" value="0" min="0.0" step="0.1" style="width:60px"/>';
        }
        function operateFormatter(value, row, index) {
            return [
                '<span><a id="EditQuestionA" href="#">编辑</a></span>',
                '<span>|</span>',
                '<span><a id="ChangeScore">修改分数</a></span>',
                '<span>|</span>',
                '<span><a id="ViewQuestionDetail">查看</a></span>'
            ].join('');
        }

    });
})();