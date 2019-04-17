using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.CandidateApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.CandidateApp
{
    public interface ICandidateAppService: IApplicationService
    {
        List<Candidate> GetCandidates(GetCandidatesInput input);
        void CreateCandidate(CreateCandidateInput input);
        void UpdateCandidate(CreateCandidateInput input);
        void DeleteCandidate(EntityDto input);
        CandidateListDto GetCandidateForEdit(EntityDto input);
    }
}
