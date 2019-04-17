var EditCandidateModal = (function ($) {
    app.modals.EditCandidateModal = function () {

        var _modalManager;
        var _candidateService = abp.services.app.candidate;
        var _$candidateForm = null;


        this.init = function (modalManager) {
            _modalManager = modalManager;

            _$candidateForm = _modalManager.getModal().find('form[name=CandidateForm]');
            _$candidateForm.validate();
        };

        this.save = function () {
            if (!_$candidateForm.valid()) {
                return;
            }

            var candidate = _$candidateForm.serializeFormToObject();

            _modalManager.setBusy(true);
            _candidateService.updateCandidate(
                candidate
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.editCandidateModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);