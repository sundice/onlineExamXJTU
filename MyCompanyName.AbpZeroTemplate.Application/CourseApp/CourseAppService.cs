using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Linq.Extensions;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.CourseApp.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.CourseApp
{
    public class CourseAppService : AbpZeroTemplateAppServiceBase, ICourseAppService
    {
        //构造函数注入
        private readonly ICourseRepository _courseRepository;
        public CourseAppService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }
        //查询
        public List<Course> GetCourses(GetCoursesInput input)
        {
            var query = _courseRepository.GetAll();
            if (!string.IsNullOrWhiteSpace(input.Filter))
            {
                query = query.Where(a => 
                    a.CourseName.Contains(input.Filter)
                );
            }
            var courses =  query.ToList();

            return courses;
        }
        //已用
        public void CreateCourse(CreateCourseInput input)
        {
            _courseRepository.Insert(new Course()
            {
                CourseName = input.CourseName,
                Scope = input.Scope,
                KnowledgePoint = input.KnowledgePoint
            });
        }

        //修改问题
        public void UpdateCourse(CreateCourseInput input)
        {
            var course = _courseRepository.Get(input.Id);
            course.CourseName = input.CourseName;
            
        }

        //已用
        public CourseListDto GetCourseForEdit(EntityDto input)
        {
            var course = _courseRepository.Get(input.Id);
            return new CourseListDto()
            {
                Id = course.Id,
                CourseName = course.CourseName
            };
        }
        ////已用
        //public List<Course> GetCourseInfo()
        //{
        //    var courseInfo = _courseRepository.GetAll().ToList();
        //    return courseInfo;
        //}
        //删除已用
        public void DeleteCourse(EntityDto input)
        {
            var course = _courseRepository.Get(input.Id);
            _courseRepository.Delete(course);
        }
    }
}
