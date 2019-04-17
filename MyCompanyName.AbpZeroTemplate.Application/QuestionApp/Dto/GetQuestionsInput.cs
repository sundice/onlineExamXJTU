using Abp.Runtime.Validation;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionApp.Dto
{
    public class GetQuestionsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string AuthorItem { get; set; }
        public string CourseItem { get; set; }
        public int? ScopeItem { get; set; }
        public int? DegreeItem { get; set; }
        public int? QuestionTypeItem { get; set; }

        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "QuestionContent";
            }
        }

        //public  string Filter { get; set; }原来搜索框
        //public void Normalize()
        //{
        //    if (string.IsNullOrEmpty(Sorting))
        //    {
        //        Sorting = "QuestionContent";
        //    }
        //}
    }
}
