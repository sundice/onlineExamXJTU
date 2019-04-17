(function ($) {

    app.modals.CreateQuestionModal = function () {
        var _questionService = abp.services.app.question;
        var _$questionForm = null;

        var _modalManager;
        this.init = function (modalManager) {
            _modalManager = modalManager;
            //取出Form表单
            _$questionForm = _modalManager.getModal().find('form[name=QuestionForm]');
        };

        this.save = function () {
            //序列化参数

            var question = _$questionForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _questionService.createQuestion(
                question
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createQuestionModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);