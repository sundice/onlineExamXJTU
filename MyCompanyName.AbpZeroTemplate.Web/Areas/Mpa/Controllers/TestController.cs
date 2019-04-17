using MyCompanyName.AbpZeroTemplate.PaperApp;
using MyCompanyName.AbpZeroTemplate.QuestionApp;
using MyCompanyName.AbpZeroTemplate.QuestionApp.Dto;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.CreatePaper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class TestController : Controller
    {
        private IPaperAppService _paperAppService;
        private IQuestionAppService _questionAppService;

        public TestController(
            IPaperAppService paperAppService,
            IQuestionAppService questionAppService)
        {
            _paperAppService = paperAppService;
            _questionAppService = questionAppService;
        }
        public ActionResult PaperInfo()
        {
            //从数据库中拿到course数据
            var CourseItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.CourseName,
                    Text = q.CourseName
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["CourseItem"] = new SelectList(CourseItems, "Value", "Text");
            return View();
        }
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
            return View();
        }

        //根据题目类型分组
        public ActionResult QtypeInfo(string courseName,int scope,string knowledgePoint,int index)
        {
            var input = new GetQcountByQtypeInput
            {
                CourseName = courseName,
                Scope = scope,
                KnowledgePoint = knowledgePoint
            };
            var qtypeCountJsonStr = _questionAppService.GetQcountByQtype(input);
            var qtypeInfoViewModel = new QtypeInfoViewModel
            {
                CourseName = courseName,
                Scope = scope,
                KnowledgePoint = knowledgePoint,
                Index = index
            };
            JArray jArray = JArray.Parse(qtypeCountJsonStr);//将json字符串转换成JsonArray对象
            foreach (var jj in jArray)//遍历数组中的每一项
            {
                JObject job = (JObject)jj;//转化为json对象
                if ((int)job["Key"] == 1){
                    qtypeInfoViewModel.Choice = (int)job["count"];
                }else if ((int)job["Key"] == 2)
                {
                    qtypeInfoViewModel.TF = (int)job["count"];
                }
                else if ((int)job["Key"] == 3)
                {
                    qtypeInfoViewModel.Black = (int)job["count"];
                }
                else if ((int)job["Key"] == 4)
                {
                    qtypeInfoViewModel.QA = (int)job["count"];
                }
                else if ((int)job["Key"] == 5)
                {
                    qtypeInfoViewModel.program = (int)job["count"];
                }
            }
            return View(qtypeInfoViewModel);
        }
        public ActionResult BuildPaperMode()
        {
            return View();
        }
        public ActionResult AICreatePaper()
        {
            return PartialView("BuildPaperByAI");
        }
        public ActionResult ManualCreatePaper()
        {
            return PartialView("BuildPaperByManual");
        }
        public ActionResult BuildPaperComplete()
        {
            return View();
        }
        public ActionResult GetQuestionsByQtypeInfo(GetQuestionsByQtypeInfoInput queryFilter)
        {
            var questions = _questionAppService.GetQuestionsByQtypeInfo(queryFilter);

            return Json(questions,JsonRequestBehavior.AllowGet);
            
        }

    }
}