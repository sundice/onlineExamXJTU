using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.CourseApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.CourseApp
{
    public interface ICourseAppService: IApplicationService
    {
        List<Course> GetCourses(GetCoursesInput input);
        void CreateCourse(CreateCourseInput input);
        void UpdateCourse(CreateCourseInput input);
        void DeleteCourse(EntityDto input);
        CourseListDto GetCourseForEdit(EntityDto input);
        //List<Course> GetCourseInfo();
    }
}
