(function () {
    $(function () {
        _paperStrategyTable = $('#PaperStrategyTable');
        var dataArray = [];//table数据来源

        window.operateEvents = {
            //将单元格的数据以参数的形式传到服务层
            "click #btn_browse": function (e, value, row, index) {
                $.ajax({
                    url: '/Mpa/CreatePaper/QtypeInfo',//控制器活动,返回一个分部视图,并且给分部视图传递数据.
                    data: {},//JSON.stringify(model),//传给服务器的数据(即后台AddUsers()方法的参数,参数类型要一致才可以)
                    type: 'POST', 
                    contentType: 'application/json;charset=utf-8',//数据类型必须有
                    async: true,//异步
                    success: function (data) //成功后的回调方法
                    {
                        $("#RefreshDiv").html(data);//data--就是对应的分部视图页面内容.
                        $.getScript("/Areas/Mpa/Views/CreatePaper/AjaxRefresh.js");
                        $.getScript("/Areas/Mpa/Views/CreatePaper/QtypeInfo.js");
                    },
                    error: function (data) {
                        alert("失败")//弹出框
                        console.log(data);
                    }
                });
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
            var dataJson = { 'CourseName': courseName, 'Scope': scope ,'KnowledgePoint':knowledgePoint}; //define a new row data，certainly it's empty  

            dataArray.push(dataJson);
            //data cookie in js
            console.log(dataArray);
            Cookies.set('dataArray', dataArray);
            //dat cookie test
            var temp = Cookies.getJSON('dataArray');
            console.log(temp);
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

    });
})();