(function ($) {

    app.modals.CreateExamModal = function () {
        var _examService = abp.services.app.exam;
        var _$examForm = null;

        var _modalManager;
        this.init = function (modalManager) {
            _modalManager = modalManager;
            //取出Form表单
            _$examForm = _modalManager.getModal().find('form[name=ExamForm]');
        };

        this.save = function () {
            //序列化参数

            var exam = _$examForm.serializeFormToObject();
            console.log(exam);
            _modalManager.setBusy(true);
            _examService.createExam(
                exam
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createExamModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);