(function () {
    $(function () {
        var _courseTable = $('#CourseTable');
        var _courseService = abp.services.app.course;

        var _editModal = new app.ModalManager({
            viewUrl: abp.appPath + 'Mpa/Course/EditModal',
            scriptUrl: abp.appPath + 'Areas/Mpa/Views/Course/_EditModal.js',
            modalClass: 'EditCourseModal'
        });
        var _createModal = new app.ModalManager({
            viewUrl: abp.appPath + 'Mpa/Course/CreateModal',
            scriptUrl: abp.appPath + 'Areas/Mpa/Views/Course/_CreateModal.js',
            modalClass: 'CreateCourseModal'
        });

        tableInit(_courseTable);//页面加载表格
        function tableInit(tableId) {
            tableId.bootstrapTable({

                url: '/Mpa/Course/GetCourseInfo',  //请求后台的URL（*）
                method: 'get',                      //请求方式（*）
                toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortable: false,                     //是否启用排序
                sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                       //初始化加载第一页，默认第一页
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: false,                //是否全局匹配,false模糊匹配
                showColumns: false,                  //是否显示所有的列
                showRefresh: false,                  //是否显示刷新按钮
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "CourseID",                     //每一行的唯一标识，一般为主键列
                showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示卡片视图
                detailView: false,                   //是否显示父子表
                queryParams: function (params) {    //传递参数(*)
                    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                        limit: params.limit,   //页面大小
                        offset: params.offset,  //页码
                        filter: $("#CourseTableFilter").val(),

                    };
                    return temp;
                },
                columns: [{
                    checkbox: true
                }, {
                    field: 'CourseID',
                    title: '序号',
                }, {
                    field: 'CourseName',
                    title: '课程名称'
                }, {
                    field: 'Scope',
                    title: '章节'
                }, {
                    field: 'KnowledgePoint',
                    title: '知识点'
                }]
            });

        }

        $('#btn_delete').click(function () {
            var rows = $("#CourseTable").bootstrapTable('getSelections');
            var ids = new Array(rows.length);
            for (var i = 0; i < rows.length; i++) {
                ids[i] = rows[i]['CouserID'];
            }
            var count = 0;
            if (rows.length == 0) {
                abp.message.info('至少选择一行');
            } else {
                abp.message.confirm(
                    app.localize('CourseDeleteWarningMessage'),
                    function (isConfirmed) {
                        if (isConfirmed) {
                            for (var i = 0; i < ids.length; i++) {
                                _courseService.deleteCourse({ id: ids[i] });
                                count++;
                            }
                            if (count > 0) {
                                abp.notify.success('成功删除' + count + '条记录');
                            } else {
                                abp.notify.error('删除失败');
                            }
                            _courseTable.bootstrapTable('destroy');
                            tableInit(_courseTable);
                        }
                    }
                );
            }
        });
        $('#btn_add').click(function () {
            _createModal.open();
        });
        $('#btn_edit').click(function () {
            var rows = $("#CourseTable").bootstrapTable('getSelections');
            if (rows.length == 0) {
                abp.message.info('至少选择一行');
            } else if (rows.length > 1) {
                abp.message.info('只能选择一行进行编辑');

            } else {
                var Id = rows[0]['Id'];

                _editModal.open({ id: Id });
            }
        });
        $('#btn_search').click(function () {
            _courseTable.bootstrapTable('destroy');
            tableInit(_courseTable);
        });
        $('#btn_reset').click(function () {
            $('#CourseTableFilter').val("");
            _courseTable.bootstrapTable('destroy');
            tableInit(_courseTable);
        });


        //事件注册
        abp.event.on('app.createCourseModalSaved', function () {
            _courseTable.bootstrapTable('destroy');
            tableInit(_courseTable);

        });
        abp.event.on('app.editCourseModalSaved', function () {
            _courseTable.bootstrapTable('destroy');
            tableInit(_courseTable);
        });
    });
})();