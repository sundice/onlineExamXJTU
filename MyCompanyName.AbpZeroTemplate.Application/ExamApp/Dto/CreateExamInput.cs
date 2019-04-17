using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.ExamApp
{
    public class CreateExamInput : EntityDto
    {
        public string ExamName { get; set; }
        public string CourseName { get; set; }
        public int? Class { get; set; }
        public DateTime ExamTime { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
    }
}