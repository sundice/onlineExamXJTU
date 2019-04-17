using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.ExamApp;
using MyCompanyName.AbpZeroTemplate.ExamApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.Exam;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class ExamController : Controller
    {
        private IExamAppService _examAppService;

        public ExamController(IExamAppService examAppService)
        {
            _examAppService = examAppService;
        }
        // GET: Mpa/Exam
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
            ExamListDto exam = _examAppService.GetExamForEdit(new EntityDto(id));
            var examViewModal = new ExamViewModel()
            {
                Id = exam.Id,
                ExamName = exam.ExamName
            };
            return PartialView("_EditModal", examViewModal);
        }

        public JsonResult GetExamInfo(int limit, int offset, string filter)
        {
            var exams = _examAppService.GetExams(new GetExamsInput(filter));
            var total = exams.Count;
            var rows = exams.Skip(offset).Take(limit).ToList();
            return Json(new { total, rows }, JsonRequestBehavior.AllowGet);
        }

    }

        
}