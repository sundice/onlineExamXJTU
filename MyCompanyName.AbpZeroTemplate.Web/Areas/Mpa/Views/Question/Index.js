(function () {
    $(function () {

        var _$questionsTable = $('#QuestionsTable');//获取id为QuestionsTable的标签
        var _$filterForm = $('#QuestionFilterForm');
        var _questionService = abp.services.app.question;

        //编辑问题
        var _editModal = new app.ModalManager({
            viewUrl: abp.appPath + 'Mpa/Question/EditModal',
            scriptUrl: abp.appPath + 'Areas/Mpa/Views/Question/_EditModal.js',
            modalClass: 'EditQuestionModal'
        });


        var _selectedDateRange = {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day')
        };


        _$filterForm.find('input.date-range-picker').daterangepicker(
            $.extend(true, app.createDateRangePickerOptions(), _selectedDateRange),
            function (start, end, label) {
                _selectedDateRange.startDate = start.format('YYYY-MM-DDT00:00:00Z');
                _selectedDateRange.endDate = end.format('YYYY-MM-DDT23:59:59.999Z');
            });

        _$questionsTable.jtable({
            title: app.localize('QuestionBrowse'),//标题
            paging: true,//启用分页
            sorting: true,//启用排序
            multiSorting: true,//启用多列排序
            actions: {
                listAction: {
                    method: _questionService.getQuestions//获取列表方法
                }
            },
            fields: {
                id: {
                    key: true,

                    title: app.localize('QuestionID'),
                    width: '5%'
                },
                questionContent: {
                    title: app.localize('QuestionContent'),
                    width: '40%',
                    display: function (data) {
                        var questionXML = string2XML(data.record.questionContent);
                        var qBody = $(questionXML).find("Body").text();
                        
                        var $div = $('<div></div>');
                        switch (data.record.questionType) {
                            case 1: var qOption = $(questionXML).find("Options").children();//拿到各个OptionItems
                                    $('<label>' + qBody + '</label><br />').appendTo($div);
                                    $(qOption).each(function () {
                                        var qOptionItem = $(this).text();
                                        $('<label>' + qOptionItem + '</label><br />').appendTo($div);
                                    });
                                    break;
                            default: $('<label>' + qBody + '</label>').appendTo($div); break;   
                        }
                        return $div;
                    }
                },
                knowledgePoint: {
                    title: app.localize('KnowledgePoint'),
                    width: '7%'
                },
                questionType: {
                    title: app.localize('QuestionType'),
                    width: '3%',
                    display: function (data) {
                        var qType;
                        switch (data.record.questionType) {
                            case 1: qType = "选择题"; break;
                            case 2: qType = "判断题"; break;
                            case 3: qType = "填空题"; break;
                            case 4: qType = "问答题"; break;
                            case 5: qType = "编程题"; break;
                        }
                        return qType;
                    }
                },
                author: {
                    title: app.localize('Author'),
                    width: '3%'
                },
                checkState: {
                    title: app.localize('CheckState'),
                    width: '3%'
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
                                deleteQuestion(data.record);
                            });
                        return $span;
                    }
                }

            }
        });
        //序列化各参数
        function createRequestParams() {//将表单内容序列化为JSON对象
            var prms = {};
            _$filterForm.serializeArray().map(function (x) { prms[x.name] = x.value; });
            return $.extend(prms, _selectedDateRange);//将日历控件中的值合并到prms中
        }
        //根据条件筛选数据
        function getQuestions() {
            _$questionsTable.jtable('load', createRequestParams());
            console.log(createRequestParams());
        }
        //删除
        function deleteQuestion(question) {
            abp.message.confirm(
                app.localize('QuestionDeleteWarningMessage', question.questionContent),
                function (isConfirmed) {
                    if (isConfirmed) {
                        _questionService.deleteQuestion({
                            id: question.id
                        }).done(function () {
                            getQuestions();
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        //convert string to xml object (将字符串转换成xml对象)
        function string2XML(xmlString) {
            // for IE(IE浏览器)
            if (window.ActiveXObject) {
                var xmlObject = new ActiveXObject("Microsoft.XMLDOM");
                xmlObject.async = "false";
                xmlObject.loadXML(xmlString);
                return xmlObject;
            }
            // for other browsers(火狐,谷歌浏览器等等)
            else {
                var parser = new DOMParser();
                var xmlObject = parser.parseFromString(xmlString, "text/xml");
                return xmlObject;
            }
        }

        //convert xml object to string (将xml对象转换成字符串)
        function xml2String(xmlObject) {
            // for IE(IE浏览器)
            if (window.ActiveXObject) {
                return xmlObject.xml;
            }
            // for other browsers(火狐,谷歌浏览器等等)
            else {
                return (new XMLSerializer()).serializeToString(xmlObject);
            }
        }







        //页面加载完执行
        getQuestions();

        //显示高级过滤
        $('#ShowAdvancedFiltersSpan').click(function () {
            $('#ShowAdvancedFiltersSpan').hide();
            $('#HideAdvancedFiltersSpan').show();
            $('#AdvacedQuestionFiltersArea').slideDown();
        });
        $('#HideAdvancedFiltersSpan').click(function () {
            $('#HideAdvancedFiltersSpan').hide();
            $('#ShowAdvancedFiltersSpan').show();
            $('#AdvacedQuestionFiltersArea').slideUp();
        });
        
        _$filterForm.keydown(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                getQuestions();
            }
        });
        //添加点击事件
        $('#CreateNewQuestionButton').click(function (e) {
            e.preventDefault();
            document.location.href = abp.appPath + "Mpa/Question/CreateQuestion";

        });
        //批量导入点击事件
        $('#BatchImportQuestionButton').click(function (e) {
            e.preventDefault();
            //欠缺
        });
        //刷新Jtable
        $('#RefreshQuestionsButton').click(function (e) {
            e.preventDefault();
            getQuestions();
        });
        //搜索点击事件
        $('#GetQuestionsButton').click(function (e) {
            //取消事件的默认动作
            e.preventDefault();
            getQuestions();
        });
        

        //事件注册
        abp.event.on('app.createQuestionModalSaved', function () {
            getQuestions(true);
        });

        abp.event.on('app.editQuestionModalSaved', function () {
            getQuestions(true);
        });
    });
})();