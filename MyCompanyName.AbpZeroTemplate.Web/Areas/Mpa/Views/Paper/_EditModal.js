var EditPaperModal = (function ($) {
    app.modals.EditPaperModal = function () {

        var _modalManager;
        var _paperService = abp.services.app.paper;
        var _$paperForm = null;


        this.init = function (modalManager) {
            _modalManager = modalManager;

            _$paperForm = _modalManager.getModal().find('form[name=PaperForm]');
            _$paperForm.validate();
        };

        this.save = function () {
            if (!_$paperForm.valid()) {
                return;
            }

            var paper = _$paperForm.serializeFormToObject();

            _modalManager.setBusy(true);
            _paperService.updatePaper(
                paper
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.editPaperModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);