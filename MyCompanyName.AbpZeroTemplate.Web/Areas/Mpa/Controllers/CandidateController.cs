using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.CandidateApp;
using MyCompanyName.AbpZeroTemplate.CandidateApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.Candidate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class CandidateController : Controller
    {
        private ICandidateAppService _candidateAppService;

        public CandidateController(ICandidateAppService candidateAppService)
        {
            _candidateAppService = candidateAppService;
        }
        // GET: Mpa/Candidate
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
            CandidateListDto candidate = _candidateAppService.GetCandidateForEdit(new EntityDto(id));
            var candidateViewModal = new CandidateViewModel()
            {
                Id = candidate.Id,
                Name = candidate.Name
            };
            return PartialView("_EditModal", candidateViewModal);
        }

        public JsonResult GetCandidateInfo(int limit, int offset, string filter)
        {//需改成Candidate表字段
            var candidates = _candidateAppService.GetCandidates(new GetCandidatesInput(filter));
            var total = candidates.Count;
            var rows = candidates.Skip(offset).Take(limit).ToList();
            return Json(new { total, rows }, JsonRequestBehavior.AllowGet);
        }

    }
}