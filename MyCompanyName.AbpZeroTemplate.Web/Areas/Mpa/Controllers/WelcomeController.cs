using System.Collections.Generic;
using System.Web.Helpers;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using MyCompanyName.AbpZeroTemplate.QuestionApp;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize]
    public class WelcomeController : AbpZeroTemplateControllerBase
    {
        private IQuestionAppService _questionAppService;

        public WelcomeController(IQuestionAppService questionAppService)
        {
            _questionAppService = questionAppService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetQuestionChart()
        {
            
            var pieData = _questionAppService.GetQtChart();
            return Json(pieData, JsonRequestBehavior.AllowGet);
        }
    }

}