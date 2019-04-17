using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.Entities;
using System;
using System.Collections.Generic;

namespace MyCompanyName.AbpZeroTemplate.PaperApp
{
    [AutoMapFrom(typeof(Paper))]
    public class PaperListDto : EntityDto, IHasCreationTime
    {
        public string PaperName { get; set; }
        public string CourseName { get; set; }
        public string Author { get; set; }
        public float Degree { get; set; }
        public string State { get; set; }
        public DateTime CreationTime { get; set; }
        public string Remarks { get; set; }
    }
    public class GetPapersOutput
    {
        public List<PaperListDto> Papers { get; set; }
    }
}