(function ($) {

    app.modals.CreateCourseModal = function () {
        var _courseService = abp.services.app.course;
        var _$courseForm = null;

        var _modalManager;
        this.init = function (modalManager) {
            _modalManager = modalManager;
            //取出Form表单
            _$courseForm = _modalManager.getModal().find('form[name=CourseForm]');
        };

        this.save = function () {
            //序列化参数

            var course = _$courseForm.serializeFormToObject();//序列化表单
            console.log(course);
            _modalManager.setBusy(true);
            _courseService.createCourse(
                course
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createCourseModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);