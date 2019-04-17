using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.CourseApp
{
    public class CreateCourseInput : EntityDto
    {
        public string CourseName { get; set; }
        public int? Scope { get; set; }
        public string KnowledgePoint { get; set; }
    }
}