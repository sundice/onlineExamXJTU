(function () {
    $(function () {

        var _$papersTable = $('#PapersTable');//获取id为PapersTable的标签
        var _paperService = abp.services.app.paper;

        _$papersTable.jtable({
            title: app.localize('PaperBrowse'),//标题
            paging: true,//启用分页
            sorting: true,//启用排序
            multiSorting: true,//启用多列排序
            actions: {
                listAction: {
                    method: _paperService.getPapers//获取列表方法
                }
            },
            fields: {
                id: {
                    key: true,
                    list: false
                },
                paperName: {
                    title: app.localize('PaperName'),
                    width: '10%'
                },
                courseName: {
                    title: app.localize('CourseName'),
                    width: '7%'
                },
                degree: {
                    title: app.localize('Degree'),
                    width: '3%'
                },
                creationTime: {
                    title: app.localize('CreationTime'),
                    width: '7%'
                },
                state: {
                    title: app.localize('State'),
                    width: '3%'
                },
                remarks: {
                    title: app.localize('Remarks'),
                    width: '7%'
                },
                actions: {
                    title: app.localize('Actions'),//操作列
                    width: '10%',
                    sorting: false,
                    display: function (data) {
                        var $span = $('<span></span>');
                        $('<button class="btn btn-default btn-xs" title="' + app.localize('Edit') + '"><i class="fa fa-edit"></i></button>')
                            .appendTo($span)
                            .click(function () {
                                _editModal.open({ id: data.record.id });
                            });
                        $('<button class="btn btn-default btn-xs" title="' + app.localize('Delete') + '"><i class="fa fa-trash-o"></i></button>')
                            .appendTo($span)
                            .click(function () {
                                deletePaper(data.record);
                            });
                        $('<button class="btn btn-default btn-xs" title="' + app.localize('Browse') + '"><i class="fa fa fa-book"></i></button>')
                            .appendTo($span)
                            .click(function () {

                                document.location.href = abp.appPath + "Mpa/Paper/BrowsePaper?paperId=" + data.record.id;

                            });
                        return $span;
                    }
                }

            }
        });

        //新建试卷
        var _createModal = new app.ModalManager({ 
            viewUrl: abp.appPath + 'Mpa/Paper/CreateModal',//加载视图
            scriptUrl: abp.appPath + 'Areas/Mpa/Views/Paper/_CreateModal.js',//加载对应js
            modalClass: 'CreatePaperModal'
        });
        //编辑试卷
        var _editModal = new app.ModalManager({
            viewUrl: abp.appPath + 'Mpa/Paper/EditModal',
            scriptUrl: abp.appPath + 'Areas/Mpa/Views/Paper/_EditModal.js',
            modalClass: 'EditPaperModal'
        });



        //获取列表(搜索框)
        function getPapers(reload) {
                    if (reload) {//重新加载文档
                        _$papersTable.jtable('reload');
                    } else {
                        _$papersTable.jtable('load', {
                            filter: $('#PapersTableFilter').val()
                        });
                    }
        }
        //删除分类
        function deletePaper(paper) {
            abp.message.confirm(
                app.localize('PaperDeleteWarningMessage', paper.paperContent),
                function (isConfirmed) {
                    if (isConfirmed) {
                        _paperService.deletePaper({
                            id: paper.id
                        }).done(function () {
                            getPapers();
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        //页面加载完执行
        getPapers();

        //添加点击事件
        $('#CreateNewPaperButton').click(function (e) {
            e.preventDefault();
            document.location.href = abp.appPath + "Mpa/CreatePaper";
            
        });
        //刷新Jtable
        $('#RefreshPapersButton').click(function (e) {
            e.preventDefault();
            getPapers();
        });
        //搜索点击事件
        $('#GetPapersButton').click(function (e) {
            //取消事件的默认动作
            e.preventDefault();
            getPapers();
        });
        

        //事件注册
        abp.event.on('app.createPaperModalSaved', function () {
            getPapers(true);
        });

        abp.event.on('app.editPaperModalSaved', function () {
            getPapers(true);
        });
    });
})();