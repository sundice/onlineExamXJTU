var EditExamModal = (function ($) {
    app.modals.EditExamModal = function () {

        var _modalManager;
        var _examService = abp.services.app.exam;
        var _$examForm = null;


        this.init = function (modalManager) {
            _modalManager = modalManager;

            _$examForm = _modalManager.getModal().find('form[name=ExamForm]');
            _$examForm.validate();
        };

        this.save = function () {
            if (!_$examForm.valid()) {
                return;
            }

            var exam = _$examForm.serializeFormToObject();

            _modalManager.setBusy(true);
            _examService.updateExam(
                exam
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.editExamModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);