using Abp.Runtime.Validation;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.ExamApp.Dto
{
    public class GetExamsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public GetExamsInput(string filter)
        {
            Filter = filter;
        }

        public string Filter { get; set; }
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "ExamName";
            }
        }
    }
}
