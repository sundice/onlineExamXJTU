using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.Entities;
using System;
using System.Collections.Generic;

namespace MyCompanyName.AbpZeroTemplate.CourseApp
{
    [AutoMapFrom(typeof(Course))]
    public class CourseListDto : EntityDto
    {
        public int CourseID { get; set; }
        public string CourseName { get; set; }
        public int? Scope { get; set; }
        public string KnowledgePoint { get; set; }
    }
    public class GetCoursesOutput
    {
        public List<CourseListDto> Courses { get; set; }
    }
}