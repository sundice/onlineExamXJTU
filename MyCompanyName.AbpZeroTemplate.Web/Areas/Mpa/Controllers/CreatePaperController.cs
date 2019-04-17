using MyCompanyName.AbpZeroTemplate.PaperApp;
using MyCompanyName.AbpZeroTemplate.QuestionApp;
using MyCompanyName.AbpZeroTemplate.QuestionApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.CreatePaper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class CreatePaperController : Controller
    {
        private IPaperAppService _paperAppService;
        private IQuestionAppService _questionAppService;

        public CreatePaperController(
            IPaperAppService paperAppService,
            IQuestionAppService questionAppService)
        {
            _paperAppService = paperAppService;
            _questionAppService = questionAppService;
        }
        // GET: Mpa/CreatePaper
        public ActionResult Index()
        {
            return View();
        }
        //试卷基本信息
        public ActionResult PaperInfo()
        {
            return PartialView("PaperInfo");
        }
        //备选题集
        public ActionResult QuestionSet()
        {
            //从数据库中拿到course数据
            var CourseNameItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.CourseName,
                    Text = q.CourseName
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["CourseNameItem"] = new SelectList(CourseNameItems, "Value", "Text");
            //从数据库中拿到scope数据
            var ScopeItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.Scope.ToString(),
                    Text = q.Scope.ToString()
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["ScopeItem"] = new SelectList(ScopeItems, "Value", "Text");
            //从数据库中拿到KnowledgePoint数据
            var KnowledgePointItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.KnowledgePoint.ToString(),
                    Text = q.KnowledgePoint.ToString()
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["KnowledgePointItem"] = new SelectList(KnowledgePointItems, "Value", "Text");
            return PartialView("QuestionSet");
        }
        //根据题目类型分组
        public ActionResult QtypeInfo()
        {
            return PartialView("QtypeInfo");
        }

        //组卷方式
        public ActionResult BuildPaperMode()
        {
            return PartialView("BuildPaperMode");
        }
        //组卷完成
        public ActionResult BuildPaperComplete()
        {
            return PartialView("BuildPaperComplete");
        }
        
    }
}