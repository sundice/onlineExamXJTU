using Abp.Runtime.Validation;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.CourseApp.Dto
{
    public class GetCoursesInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public GetCoursesInput(string filter)
        {
            Filter = filter;
        }

        public string Filter { get; set; }
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "CourseName";
            }
        }
    }
}
