using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.CourseApp;
using MyCompanyName.AbpZeroTemplate.CourseApp.Dto;
using MyCompanyName.AbpZeroTemplate.ImageApp;
using MyCompanyName.AbpZeroTemplate.ImageApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionApp;
using MyCompanyName.AbpZeroTemplate.QuestionApp.Dto;
using MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.Question;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Controllers
{
    public class QuestionController:Controller
    {
        private IQuestionAppService _questionAppService;
        private IImageAppService _imageAppService;

        public QuestionController(
            IQuestionAppService questionAppService,
            IImageAppService imageAppService)
        {
            _questionAppService = questionAppService;
            _imageAppService = imageAppService;
        }
        public ActionResult Index()
        {
            //从数据库中拿到author数据
            var AuthorItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.Author,
                    Text = q.Author
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["AuthorItem"] = new SelectList(AuthorItems,"Value","Text");

            //从数据库中拿到course数据
            var CourseItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.CourseName,
                    Text = q.CourseName
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["CourseItem"] = new SelectList(CourseItems, "Value", "Text");
            //从数据库中拿到scope数据
            var ScopeItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.Scope.ToString(),
                    Text = q.Scope.ToString()
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["ScopeItem"] = new SelectList(ScopeItems, "Value", "Text");
            //从数据库中拿到Degree数据
            var DegreeItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.Degree.ToString(),
                    Text = q.Degree.ToString()
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["DegreeItem"] = new SelectList(DegreeItems, "Value", "Text");
            //从数据库中拿到questiontype数据
            var QuestionTypeItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.QuestionType.ToString(),                    
                    Text = q.QuestionType.ToString()
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["QuestionTypeItem"] = new SelectList(QuestionTypeItems, "Value", "Text");
            return View();
        }
        //添加问题
        public ActionResult CreateQuestion()
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
            //从数据库中拿到Degree数据
            var DegreeItems = _questionAppService.GetSelectItems()
                .Select(q => new SelectListItem()
                {
                    Value = q.Degree.ToString(),
                    Text = q.Degree.ToString()
                }).Distinct().ToList();
            //SelectList ： 使用SelectList辅助类构建
            ViewData["DegreeItem"] = new SelectList(DegreeItems, "Value", "Text");
            return View();
        }
        //编辑问题
        public ActionResult EditModal(int id)
        {
            QuestionListDto question = _questionAppService.GetQuestionForEdit(new EntityDto(id));
            QuestionViewModel questionViewModel = new QuestionViewModel()
            {
                Id = question.Id,
                QuestionContent = question.QuestionContent
            };
            return PartialView("_EditModal", questionViewModel);
        }

        /// <summary>
        /// 把图片上传到服务器并保存路径到数据库
        /// </summary>
        /// <returns></returns>
        public int SaveImage()
        {
            int result = 0;//标志位,插入成功与否
            HttpPostedFileBase image = Request.Files["imageFile"];// 从前台获取文件,imageFile为input name属性
            string fileName = image.FileName;

            //转换只取得文件名，去掉路径。
            if (fileName.LastIndexOf("\\") > -1)
            {
                fileName = fileName.Substring(fileName.LastIndexOf("\\") + 1);
            }
            string fileType = fileName.Substring(fileName.LastIndexOf(".") + 1); // 以“.”截取，获取“.”后面的文件后缀
            Regex imageType = new Regex(@"^(bmp)|(png)|(gif)|(jpg)|(jpeg)"); // 验证文件后缀的表达式
            if (string.IsNullOrEmpty(fileName) || !imageType.IsMatch(fileType)) // 验证后缀，判断文件是否是所要上传的格式
            {
                result = 0;
            }
            else
            {
                fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + "-" + Path.GetFileName(fileName);                
                string imageStr = "Areas/Mpa/Views/QuestionImg/"; // 获取保存图片的项目文件夹
                string uploadPath = Server.MapPath("~/" + imageStr); // 将项目路径与文件夹合并
                string saveFile = uploadPath + fileName;//文件路径
                image.SaveAs(saveFile);// 保存图片到服务器

                // 保存图片到数据库,如果图片较少可直接保存，数量过多建议保存图片路径
                //string imageUrl = imageStr + fileName;// 设置数据库保存的路径(备用)
                byte[] imgData = new byte[image.ContentLength];
                image.InputStream.Read(imgData, 0, image.ContentLength);
                CreateImageInput input = new CreateImageInput();
                input.Data = imgData;
                result = _imageAppService.CreateImageAndReturnID(input);//返回当前图片的ID

                }
            return result;
        }

        //题型数字和字符串的对应
        public string QTypeInt2QTypeString(int QTypeInt)
        {
            string QTypeString = "";
            switch (QTypeInt)
            {
                case 1:QTypeString = "选择题";break;
                case 2:QTypeString = "判断题";break;
                case 3:QTypeString = "填空题";break;
                case 4:QTypeString = "问答题";break;
                case 5:QTypeString = "编程题";break;
                default: QTypeString = "待定";break;
            }
            return QTypeString;
        }
    }
}