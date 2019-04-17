var EditQuestionModal = (function ($) {
    app.modals.EditQuestionModal = function () {

        var _modalManager;
        var _questionService = abp.services.app.question;
        var _$questionForm = null;


        this.init = function (modalManager) {
            _modalManager = modalManager;

            _$questionForm = _modalManager.getModal().find('form[name=QuestionForm]');
            _$questionForm.validate();
        };

        this.save = function () {
            if (!_$questionForm.valid()) {
                return;
            }

            var question = _$questionForm.serializeFormToObject();

            _modalManager.setBusy(true);
            _questionService.updateQuestion(
                question
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.editQuestionModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);