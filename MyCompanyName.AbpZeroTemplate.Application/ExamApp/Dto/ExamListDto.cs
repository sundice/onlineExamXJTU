using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.Entities;
using System;
using System.Collections.Generic;

namespace MyCompanyName.AbpZeroTemplate.ExamApp
{
    [AutoMapFrom(typeof(Exam))]
    public class ExamListDto : EntityDto
    {
        public int ExamID { get; set; }
        public string ExamName { get; set; }
        public string CourseName { get; set; }
        public int? Class { get; set; }
        public DateTime ExamTime { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
    }
    public class GetExamsOutput
    {
        public List<ExamListDto> Exams { get; set; }
    }
}