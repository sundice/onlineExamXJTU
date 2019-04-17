var EditCourseModal = (function ($) {
    app.modals.EditCourseModal = function () {

        var _modalManager;
        var _courseService = abp.services.app.course;
        var _$courseForm = null;


        this.init = function (modalManager) {
            _modalManager = modalManager;

            _$courseForm = _modalManager.getModal().find('form[name=CourseForm]');
            _$courseForm.validate();
        };

        this.save = function () {
            if (!_$courseForm.valid()) {
                return;
            }

            var course = _$courseForm.serializeFormToObject();

            _modalManager.setBusy(true);
            _courseService.updateCourse(
                course
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.editCourseModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);