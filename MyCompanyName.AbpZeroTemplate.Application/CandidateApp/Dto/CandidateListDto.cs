using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.Entities;
using System;
using System.Collections.Generic;

namespace MyCompanyName.AbpZeroTemplate.CandidateApp
{
    [AutoMapFrom(typeof(Candidate))]
    public class CandidateListDto : EntityDto
    {
        public int CandidateID { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public int? Class { get; set; }
        public string CreationTime { get; set; }
        public string Major { get; set; }
        public string Remarks { get; set; }
    }
    public class GetCandidatesOutput
    {
        public List<CandidateListDto> Candidates { get; set; }
    }
}