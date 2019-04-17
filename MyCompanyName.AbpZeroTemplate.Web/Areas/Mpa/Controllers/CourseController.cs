using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.CourseApp;
using MyCompanyName.AbpZeroTemplate.CourseApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.Course;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class CourseController : Controller
    {
        private ICourseAppService _courseAppService;

        public CourseController(ICourseAppService courseAppService)
        {
            _courseAppService = courseAppService;
        }
        // GET: Mpa/Course
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CreateModal()
        {
            return PartialView("_CreateModal");
        }
        public ActionResult EditModal(int id)
        {
            CourseListDto course = _courseAppService.GetCourseForEdit(new EntityDto(id));
            var courseViewModal = new CourseViewModel()
            {
                Id = course.Id,
                CourseName = course.CourseName
            };
            return PartialView("_EditModal", courseViewModal);
        }

        public JsonResult GetCourseInfo(int limit, int offset, string filter)
        {
            var courses = _courseAppService.GetCourses(new GetCoursesInput(filter));
            var total = courses.Count;
            var rows = courses.Skip(offset).Take(limit).ToList();
            return Json(new { total, rows }, JsonRequestBehavior.AllowGet);
        }

    }


}