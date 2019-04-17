(function ($) {

    app.modals.CreateCandidateModal = function () {
        var _candidateService = abp.services.app.candidate;
        var _$candidateForm = null;

        var _modalManager;
        this.init = function (modalManager) {
            _modalManager = modalManager;
            //取出Form表单
            _$candidateForm = _modalManager.getModal().find('form[name=CandidateForm]');
        };

        this.save = function () {
            //序列化参数

            var candidate = _$candidateForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _candidateService.createCandidate(
                candidate
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createCandidateModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);