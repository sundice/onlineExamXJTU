(function () {
    $(function () {
        var _$questionForm = $('#QuestionForm');
        var _questionService = abp.services.app.question;
        //初始化富文本编辑器
        initTinymce = function () {
            return tinymce.init({
                selector: "#seniorEdit textarea",
                branding: false,
                paste_as_text: true,
                language: "zh_CN",
                theme: "silver",
                height: 400,
                plugins: 'code charmap image paste',
                menubar: false,
                relative_urls: false,
                toolbar: " undo redo | bold italic | charmap | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image code"
            });
        };
        //插入图片和高级编辑
        $("div[contenteditable='true']").live("mousedown", function (e) {
            var toolBar = '<div class="zon-edit">' + '<ul class="fast_machine">' + '<li><form action="" method="post" id="imageform" enctype="multipart/form-data">' + '<input type="file" name="imageFile" id="uploadFile"><a name="插入图片" href="javascript:;" class="add_Img">' + '<i class="icon-edit-custome icon-import-img" style="height:30px;width:30px"></i></a></form></li>' + '<li><a href="javascript:;" name="高级编辑" class="SeniorEdit"><i class="icon-edit-custome menu_edit2_icon" style="height:30px;width:30px"></i></a></li>' + '</ul>' + '</div>';
            
            if (e.which === 3) {
                $(this).focus();
            }
            $("div[contenteditable='true']").removeClass("txtEdit");
            $(".zon-edit").remove();
            $(this).select();
            $(this).addClass("txtEdit");
            if ($(this).prev(".zon-edit").length === 0) {
                $(toolBar).insertBefore(this);
                $('.SeniorEdit').on('click', function () {
                    $(".editInputarea").remove();
                    $("#seniorEdit").find(".modal-body").append("<textarea class='editInputarea' rows='5'></textarea>");
                    tinymce.remove();
                    //$(".mce-tinymce").remove();
                    $("#seniorEdit").find("textarea").val($(this).parents(".zon-edit").next().html()).removeProp("id");//防止重复初始化tinymce
                    initTinymce();
                    $(".mce-tinymce").css("display", "block");
                    
                    $("#seniorEdit").modal("show");
                    $('.modal-backdrop')[0].style.zIndex = "0";//幕布放在模态框下面
                    
                    $(".save-seniorEditContent").on('click', function () {
                        var id = $("#seniorEdit").find("textarea").attr("id");
                        var _editedDiv = $(".zon-edit").next().empty();
                        _editedDiv.html(tinymce.get(id).getContent());
                        
                    });
                });
            }
            $('#uploadFile').on('change', function () {
                var uploadImg, _this;
                _this = $(this);
                uploadImg = function () {
                    //$("input[name=csrfmiddlewaretoken]").val($("#csrf").children("input").val());
                    return $("#imageform").ajaxForm({
                        //headers: {
                        //    'X-CSRFToken': $("#csrf").children("input").val(),
                        //    contentType: "text/plain"
                        //},
                        url: "/Question/SaveImage",
                        success: function (data) {//返回ImageID并插入到img标签中的id属性
                            var _imageId = data;
                            var _imageDiv = "#" + _this.parents(".zon-edit").next().attr("id");//放置image的Div
                            var fileList = _this[0].files;
                            console.log(_imageDiv);
                            for (var i = 0; i < fileList.length; i++) {
                                $(_imageDiv).append('<img id="'+_imageId+'" src="' + URL.createObjectURL(fileList[i]) + '">');
                            }
                        },
                        error: function (data) {
                            alert("insert image error");
                        }
                    }).submit();
                };
                uploadImg();
            });
            return e.stopPropagation();
        });
        //点击其他位置，插入图片和富文本编辑区域消失
        $(document).on('click', function (e) {
            var parentDivs, parentDivsHasEdit, v, _i, _len;
            parentDivs = $(e.target).parents();
            parentDivsHasEdit = false;
            for (_i = 0, _len = parentDivs.length; _i < _len; _i++) {
                v = parentDivs[_i];
                if ($(v).attr("class") && $(v).attr("class").indexOf("txtEdit") > -1) {
                    return parentDivsHasEdit = true;
                }
            }
            if ($(e.target).parents(".zon-edit").length === 0 && !parentDivsHasEdit && $(e.target).attr("contenteditable") !== 'true') {
                $(".txtEdit").removeClass("txtEdit");
                return $(".zon-edit").remove();
            }
        });
        //删除选项
        $("span.delete").live("click",function () {
            var _lastOptId = $(this).parents(".item-opts").children().last().attr("id");
            if (_lastOptId == "B") {
                abp.message.info("至少保留两个选项！");
            } else {
                var _optIndex = parseInt($(this).parents(".item-opt").attr("index")); 
                var _lastOptIndex = parseInt($(this).parents(".item-opts").children().last().attr("index")); 
                
                for (var i = _optIndex; i < _lastOptIndex; i++) {
                    if (i + 1 <= _lastOptIndex) {
                        var _optCur = "#opt" + i;
                        var _optNext = "#opt" + (i + 1);
                        $(_optCur).html($(_optNext).text());
                    }
                }
                $(this).parents(".item-opts").children().last().remove();
            }           
        });
        //增加选项
        $("#addItem").live("click", function () {
            var _this = $(this);
            var _lastIndex = parseInt($("#itemOpts").children().last().attr("index"));
            if (_lastIndex > 24) {
                abp.message.info("已超过最大选项数！");
                return;
            }
            var _itemIndex = _lastIndex + 1;
            var _itemOpt = String.fromCharCode(65 + _itemIndex);
            var _qType = $("#QTypeSelect").val();
            switch (_qType) {
                case "0": var _item = '<div class="item-opt" id="' + _itemOpt + '"index="' + _itemIndex + '"><label class="ez-radio-right" ><input type="radio" name="radioCheck" value="' + _itemOpt + '"><span class="checkmark"></span><span class="opt-id">&nbsp;' + _itemOpt + '</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id = "opt' + _itemIndex + '" contenteditable = "true" placeholder = "选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:Text"></div></div></div> ';break;
                case "1": var _item = '<div class="item-opt" id="' + _itemOpt + '"index="' + _itemIndex + '"><label class="ez-checkbox-right" ><input type="checkbox" name="checkboxCheck" value="' + _itemOpt + '"><span class="checkmark"></span><span class="opt-id">&nbsp;' + _itemOpt + '</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id = "opt' + _itemIndex + '" contenteditable = "true" placeholder = "选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:Text"></div></div></div> '; break;
                case "3":
                    var _blankItemCount = $("#Qbody").find("input").length;
                    var _blankItem = '&nbsp;<input type="text" index="' + _blankItemCount + '" placeholder="相似答案用 ||| 隔开">&nbsp;';
                    $("#Qbody").append(_blankItem); break;
                case "5":
                    var _subItemType = _this.parents(".sc").attr("qtype");
                    switch (_subItemType) {
                        case "0":
                            var _subSClastIndex = parseInt($("#subSCOpts").children().last().attr("index"));
                            if (_subSClastIndex > 24) {
                                abp.message.info("已超过最大选项数！");
                                return;
                            }
                            var _subSCItemIndex = _subSClastIndex + 1;
                            var _subSCItemOpt = String.fromCharCode(65 + _subSCItemIndex);
                            var _subSCItem = '<div class="item-opt" id="' + _subSCItemOpt + '"index="' + _subSCItemIndex + '"><label class="ez-radio-right" ><input type="radio" name="radioCheck" value="' + _subSCItemOpt + '"><span class="checkmark"></span><span class="opt-id">&nbsp;' + _subSCItemOpt + '</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id = "opt' + _subSCItemIndex + '" contenteditable = "true" placeholder = "选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:Text"></div></div></div> ';
                            $("#subSCOpts").append(_subSCItem);
                            break;
                        case "1":
                            var _subMClastIndex = parseInt($("#subMCOpts").children().last().attr("index"));
                            if (_subMClastIndex > 24) {
                                abp.message.info("已超过最大选项数！");
                                return;
                            }
                            var _subMCItemIndex = _subMClastIndex + 1;
                            var _subMCItemOpt = String.fromCharCode(65 + _subMCItemIndex);
                            var _subMCItem = '<div class="item-opt" id="' + _subMCItemOpt + '"index="' + _subMCItemIndex + '"><label class="ez-radio-right" ><input type="radio" name="radioCheck" value="' + _subMCItemOpt + '"><span class="checkmark"></span><span class="opt-id">&nbsp;' + _subMCItemOpt + '</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id = "opt' + _subMCItemIndex + '" contenteditable = "true" placeholder = "选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:Text"></div></div></div> ';
                            $("#subMCOpts").append(_subMCItem); break;
                        case "3":
                            var _subBlankCount = $("#subBlankQbody").find("input").length;
                            var _subBlankItem = '&nbsp;<input type="text" index="' + _subBlankCount + '" placeholder="相似答案用 ||| 隔开">&nbsp;';
                            _this.prev().children().append(_subBlankItem); break;

                            break;
                        default: break;
                    }
                    break;
                default: break;
            }
            $("#itemOpts").append(_item);
        });
        //点击增加子试题button 下拉列表的显示与消失
        $("#addSubItem").click(function (e) {
            if ($(".add-item-type")[0].style.display == "none") {
                $(".add-item-type").show();
            } else {
                $(".add-item-type").hide();
            }           
        });
        //选择添加子试题
        $(".add-item-type").find("li").click(function () {
            var _subItemType = $(this).text();
            console.log(_subItemType);
            var _subItemCount = $(".item-content-groups").find(".item-content").length;
            var _subItemSC = '<div id="subItem' + _subItemCount + '" class="item-content" index="' + _subItemCount + '"><div class="item-config"><ul><li class="item-num"><b class="itemNum">' + (_subItemCount + 1) + '.</b><span class="sub-items-wrap"><b>单选题</b></span></li><li class="item-operate-btns pull-right"><span class="deleteSub" title="删除本题" style="cursor:pointer"><span class="fa fa-trash-o"></span></span></li></ul></div>'
                + '<div class="subitem sub_sc">'
                + '<div class="sc" qtype="0"><div class="subItem-stem"><div id="subSCQbody' + _subItemCount + '" contenteditable="true" placeholder="题干，点击编辑(必填)" style="cursor:text"></div></div><div id="subSCOpts" class="item-opts">'
                + '<div class="item-opt" id="A" index="0"><label class="ez-radio-right"><input type="radio" name="radioCheck" value="A"><span class="checkmark"></span><span class="opt-id">&nbsp;A</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt0" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'
                + '<div class="item-opt" id="B" index="1"><label class="ez-radio-right"><input type="radio" name="radioCheck" value="B"><span class="checkmark"></span><span class="opt-id">&nbsp;B</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt1" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'
                + '<div class="item-opt" id="C" index="2"><label class="ez-radio-right"><input type="radio" name="radioCheck" value="C"><span class="checkmark"></span><span class="opt-id">&nbsp;C</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt2" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'
                + '<div class="item-opt" id="D" index="3"><label class="ez-radio-right"><input type="radio" name="radioCheck" value="D"><span class="checkmark"></span><span class="opt-id">&nbsp;D</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt3" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div></div>'
                + '<div id = "addItem" class="btn-add-item-opt" > +增加选项</div ><div class="item-analysis"><div class="analysis-txt">试题解析：</div><div contenteditable="true" class="item-analysis-content" placeholder="试题解析，点击编辑"></div></div></div></div></div>';
            var _subItemMC = '<div id="subItem' + _subItemCount + '" class="item-content" index="' + _subItemCount + '"><div class="item-config"><ul><li class="item-num"><b class="itemNum">' + (_subItemCount + 1) + '.</b><span class="sub-items-wrap"><b>多选题</b></span></li><li class="item-operate-btns pull-right"><span class="deleteSub" title="删除本题" style="cursor:pointer"><span class="fa fa-trash-o"></span></span></li></ul></div>'
                + '<div class="subitem sub_sc">'
                + '<div class="sc" qtype="1"><div class="subItem-stem"><div id="subMCQbody' + _subItemCount + '" contenteditable="true" placeholder="题干，点击编辑(必填)" style="cursor:text"></div></div><div id="subMCOpts" class="item-opts">'
                + '<div class="item-opt" id="A" index="0"><label class="ez-checkbox-right"><input type="checkbox" name="checkboxCheck" value="A"><span class="checkmark"></span><span class="opt-id">&nbsp;A</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt0" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'
                + '<div class="item-opt" id="B" index="1"><label class="ez-checkbox-right"><input type="checkbox" name="checkboxCheck" value="B"><span class="checkmark"></span><span class="opt-id">&nbsp;B</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt1" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'
                + '<div class="item-opt" id="C" index="2"><label class="ez-checkbox-right"><input type="checkbox" name="checkboxCheck" value="C"><span class="checkmark"></span><span class="opt-id">&nbsp;C</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt2" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'
                + '<div class="item-opt" id="D" index="3"><label class="ez-checkbox-right"><input type="checkbox" name="checkboxCheck" value="D"><span class="checkmark"></span><span class="opt-id">&nbsp;D</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt3" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div></div>'
                + '<div id = "addItem" class="btn-add-item-opt" > +增加选项</div ><div class="item-analysis"><div class="analysis-txt">试题解析：</div><div contenteditable="true" class="item-analysis-content" placeholder="试题解析，点击编辑"></div></div></div></div></div>';
            var _subItemTF = '<div id="subItem' + _subItemCount + '" class="item-content" index="' + _subItemCount + '"><div class="item-config"><ul><li class="item-num"><b class="itemNum">' + (_subItemCount + 1) + '.</b><span class="sub-items-wrap"><b>判断题</b></span></li><li class="item-operate-btns pull-right"><span class="deleteSub" title="删除本题" style="cursor:pointer"><span class="fa fa-trash-o"></span></span></li></ul></div>'
                + '<div class="subitem sub_sc">'
                + '<div class="sc" qtype="2"><div class="subItem-stem"><div id="subTFQbody' + _subItemCount + '" contenteditable="true" placeholder="题干，点击编辑(必填)" style="cursor:text"></div></div><div id="subTFOpts" class="item-opts">'
                + '<div class="item-opt" id="A" index="0"><label class="ez-radio-right"><input type="radio" name="radioCheck" value="A"><span class="checkmark"></span><span class="opt-id">&nbsp;A</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt0" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div>'                
                + '<div class="item-opt" id="B" index="1"><label class="ez-radio-right"><input type="radio" name="radioCheck" value="B"><span class="checkmark"></span><span class="opt-id">&nbsp;B</span></label><div class="opt-content-wrap"><span class="delete" style="cursor:pointer"><span class="fa fa-times-circle-o"></span></span><div id="opt1" contenteditable="true" placeholder="选项，点击编辑；选中即设置正确答案，将作为判分答案(必填)" style="cursor:text"></div></div></div></div>'
                + '<div class="item-analysis"><div class="analysis-txt">试题解析：</div><div contenteditable="true" class="item-analysis-content" placeholder="试题解析，点击编辑"></div></div></div></div></div>';
            var _subItemBlank = '<div id="subItem' + _subItemCount + '" class="item-content" index="' + _subItemCount + '"><div class="item-config"><ul><li class="item-num"><b class="itemNum">' + (_subItemCount + 1) + '.</b><span class="sub-items-wrap"><b>填空题</b></span></li><li class="item-operate-btns pull-right"><span class="deleteSub" title="删除本题" style="cursor:pointer"><span class="fa fa-trash-o"></span></span></li></ul></div>'
                + '<div class="subitem sub_sc">'
                + '<div class="sc" qtype="3"><div class="subItem-stem"><div id="subBlankQbody' + _subItemCount + '" contenteditable="true" placeholder="题干，点击编辑(必填)" style="cursor:text"></div></div>'
                + '<div id="addItem" class="btn-add-item-opt" > +添加填空项</div ><hr /><div class="checkbox checkbox-custom pull-left"><input type="checkbox" class="option_group" id="option_group' + _subItemCount + '"><label for="option_group' + _subItemCount + '"></label></div><label for="option_group' + _subItemCount + '">&nbsp; 允许考生答案与参考答案顺序不一致</label>'
                + '<div class="item-analysis"><div class="analysis-txt">试题解析：</div><div contenteditable="true" class="item-analysis-content" placeholder="试题解析，点击编辑"></div></div></div>';
            switch (_subItemType) {
                case "单选题": $(".item-content-groups").append(_subItemSC); break;
                case "多选题": $(".item-content-groups").append(_subItemMC);break;
                case "判断题": $(".item-content-groups").append(_subItemTF);break;
                case "填空题": $(".item-content-groups").append(_subItemBlank);break;
                default: break;

            }
            $(".add-item-type").hide();
            
        });
        //删除子试题
        $("span.deleteSub").live("click",function () {
            var _curNextSubIndex = parseInt($(this).parents('.item-content').next().attr("index")); 
            var _lastSubIndex = parseInt($(".item-content-groups").children().last().attr("index"));
            console.log(_curNextSubIndex);
            console.log(_lastSubIndex);
            for (var i = _curNextSubIndex; i <= _lastSubIndex; i++) {
                $("#subItem" + i).attr("index", i-1);
                $("#subItem" + i).find("b.itemNum").text(i + ".");
                $("#subItem" + i).attr("id", "subItem" + (i - 1));
            }
            $(this).parents('.item-content').remove();
        });
        //将表单内容序列化为JSON对象
        function createRequestParams(form) {
            var prms = {};
            form.serializeArray().map(function (x) { prms[x.name] = x.value; });
            return prms;
        }
        ;
        //题目内容存储为XML格式
        function createQuestionXML() {
            
            var $questions = $.parseXML('<Questions></Questions>');

            var $question = $questions.createElement("Question");//题型
            var _qType = $("#QTypeSelect").val();
            $question.setAttribute("QType", _qType);

            var $body = $questions.createElement("Body");//题干
            var $cdataBody = $questions.createCDATASection($("#Qbody").text());
            $body.appendChild($cdataBody);
            //此部分往上可通用
            var _lastIndex = parseInt($("#itemOpts").children().last().attr("index")) + 1;
            var $options = $questions.createElement("Options");//选项
            $options.setAttribute("Num", _lastIndex.toString());

            var $answer = $questions.createElement("Answer");//答案
            $answer.setAttribute("Num", "1");
            var $answerItem = $questions.createElement("AnswerItems");
            var $answerText = $questions.createTextNode($('input:radio[name="radioCheck"]:checked').val());
            $answerItem.appendChild($answerText);
            $answer.appendChild($answerItem);

            var $analysis = $questions.createElement("Analysis");//解析
            var $cdataAnalysis = $questions.createCDATASection($(".item-analysis-content").text());
            $analysis.appendChild($cdataAnalysis);

            var $attachment = $questions.createElement("Attachment");//题干图片
            var $Image = $questions.createElement("Image");
            var $ImagesID = $questions.createElement("ImagesID");
            var $ImagesIDTextNode = $questions.createTextNode($("#Qbody").find("img").attr("id"));
            $ImagesID.appendChild($ImagesIDTextNode);
            $Image.appendChild($ImagesID);
            $attachment.appendChild($Image);

          
            $.each($("#itemOpts").children(), function (i) {//循环每个选项
                var opt = "#opt" + i;
                var $optionItems = $questions.createElement("OptionItems");
                $optionItems.setAttribute("Order", i.toString());
                var $cdataOptionItems = $questions.createCDATASection($(opt).text());

                $.each($(opt).find("img"), function (imgorder) {//每个选项插入图片
                    var $ImageOpt = $questions.createElement("Image");
                    var $ImagesID = $questions.createTextNode($(opt).find("img")[imgorder].id);
                    $ImageOpt.setAttribute("Order", imgorder.toString());
                    $ImageOpt.appendChild($ImagesID);
                    $optionItems.appendChild($ImageOpt);   
                });

                $optionItems.appendChild($cdataOptionItems);
                $options.appendChild($optionItems);
            });
            $question.appendChild($body);
            $question.appendChild($options);
            $question.appendChild($answer);
            $question.appendChild($attachment);
            $question.appendChild($analysis);

            $questions.documentElement.appendChild($question);

            return $questions;
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
        //添加点击事件
        $('#CreateNewQuestionBtn').click(function () {
            var question = createRequestParams(_$questionForm);
            var questionContent = { QuestionContentItem: xml2String(createQuestionXML()) };
            console.log(createQuestionXML());
            $.extend(question, questionContent);
            
            console.log(question);
            //_questionService.createQuestion(
            //    question
            //).done(function () {
            //    abp.notify.info(app.localize('SavedSuccessfully'));
            //    document.getElementById("QuestionForm").reset();
            //});
        });
        //取消点击事件
        $('#CancelBtn').click(function (e) {
            e.preventDefault();
            document.location.href = abp.appPath + "Mpa/Question";//跳转
        });
    
    });
})();