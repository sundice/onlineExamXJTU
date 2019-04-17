using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.CandidateApp
{
    public class CreateCandidateInput : EntityDto
    {
        public int CandidateID { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public int? Class { get; set; }
        public string CreationTime { get; set; }
        public string Major { get; set; }
        public string Remarks { get; set; }
    }
}