(function () {
    $(function () {
        var _$paperInfoForm = $('#PaperInfoForm');


        $("#IndexPreStrp").click(function () {
            document.location.href = abp.appPath + "Mpa/Paper";
        });
        $("#IndexNextStep").click(function () {
            var paperInfo = _$paperInfoForm.serializeFormToObject();
            console.log(paperInfo);
            Cookies.set('PaperInfo', paperInfo);
            document.location.href = abp.appPath + "Mpa/Test/QuestionSet";

        }); 
    });
})();