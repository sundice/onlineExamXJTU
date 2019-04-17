using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.PaperApp;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.Paper;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class PaperController : Controller
    {
        private IPaperAppService _paperAppService;

        public PaperController(IPaperAppService paperAppService)
        {
            _paperAppService = paperAppService;
        }
        // GET: Mpa/Paper
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
            PaperListDto paper = _paperAppService.GetPaperForEdit(new EntityDto(id));
            PaperViewModel paperViewModel = new PaperViewModel()
            {
                Id = paper.Id,
                PaperName = paper.PaperName
            };
            return PartialView("_EditModal", paperViewModel);
        }
        public ActionResult BrowsePaper(int paperId,string Author="",string PaperName="",float paperDegree=0)
        {
            PaperListDto paper = _paperAppService.GetPaperForBrowse(new EntityDto(paperId));
            var paperBrowseViewModel = new PaperBrowseViewModel()
            {
                Id = paperId,
                Author = paper.Author,
                PaperName = paper.PaperName,
                Degree = paper.Degree
            };
            return View(paperBrowseViewModel);
        }

        public JsonResult GetPaperContent(int limit, int offset)
        {
            var lstRes = new List<Paper>();
            for (var i = 0; i < 50; i++)
            {
                var oModel = new Paper();
                oModel.PaperContent = "第"+i+"题：blablablalalalalla......";
                oModel.Degree = 2;
                lstRes.Add(oModel);
            }
            foreach(Paper p in lstRes){
                Console.WriteLine(p);
            }
            var total = lstRes.Count;
            var rows = lstRes.Skip(offset).Take(limit).ToList();
            var data = Json(new { total, rows }, JsonRequestBehavior.AllowGet);
            return data;
        }
    }
}