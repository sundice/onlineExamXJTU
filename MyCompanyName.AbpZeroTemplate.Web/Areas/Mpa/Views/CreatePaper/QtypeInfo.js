(function () {
    $(function () {

        //重置按钮事件
        window.operateEvents = {
            //将单元格的数据以参数的形式传到服务层
            "click #btn_browse": function (e, value, row, index) {
                var json = {};
                json["CourseName"] = row.CourseName;
                json["Scope"] = row.Scope;
                json["KnowledgePoint"] = row.KnowledgePoint;
                console.log(json);

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

                    },
                    error: function () {
                        alert("失败")//弹出框
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


        $('#QtypeInfoTable').bootstrapTable({
            //url: '/Mpa/CreatePaper/GetPaperStrategy',  //请求后台的URL（*）
            //method: 'get',                      //请求方式（*）
            toolbar: '#label',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            //cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            //showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            //cardView: false,                    //是否显示详细视图
            //detailView: false,                   //是否显示父子表
            //queryParams: function (params) {    //传递参数(*)
            //    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            //        limit: params.limit,   //页面大小
            //        offset: params.offset,  //页码
            //    };
            //    return temp;
            //},
            columns: [{
                field: 'CourseName',
                title: '选择题'
            }, {
                field: 'Scope',
                title: '判断'
            }, {
                field: 'KnowledgePoint',
                title: '填空'
            }, {
                field: 'Operate',
                title: '问答',
                events: operateEvents,
                formatter: labelFormatter
            }, {
                field: 'Remarks',
                title: '编程'
            }, {
                field: 'Operate',
                title: '操作',
                formatter: operateFormatter
            }]

        });
    });

    function labelFormatter(value, row, index) {
        return [
            '<button id="btn_reset" type="button" class="btn btn-default"><span class= "glyphicon glyphicon-remove" aria-hidden="true"></span > 重置</button >'
        ].join('');
    }

    function operateFormatter(value, row, index) {
        return [ 
            '<button id="btn_reset" type="button" class="btn btn-default"><span class= "glyphicon glyphicon-remove" aria-hidden="true"></span > 重置</button >'
        ].join('');
    }



})();