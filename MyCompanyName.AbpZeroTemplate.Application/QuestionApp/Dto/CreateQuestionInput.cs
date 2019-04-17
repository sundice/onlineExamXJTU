using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionApp.Dto
{
    //对应的是页面中各个控件的name，要与传过来的json对象命名保持一致
    public class CreateQuestionInput:EntityDto
    {
        public string CourseNameItem { get; set; }
        public int? ScopeItem { get; set; }
        public string KnowledgePointItem { get; set; }
        public int QTypeItem { get; set; }
        public int DegreeItem { get; set; }
        public string QuestionContentItem { get; set; }
        public string Author { get; set; }

    }
}
