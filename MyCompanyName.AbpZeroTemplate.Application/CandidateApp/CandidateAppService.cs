using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Linq.Extensions;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.CandidateApp.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.CandidateApp
{
    public class CandidateAppService : AbpZeroTemplateAppServiceBase, ICandidateAppService
    {
        //构造函数注入
        private readonly ICandidateRepository _candidateRepository;
        public CandidateAppService(ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }
        //查询
        public List<Candidate> GetCandidates(GetCandidatesInput input)
        {
            var query = _candidateRepository.GetAll();
            if (!string.IsNullOrWhiteSpace(input.Filter))
            {
                query = query.Where(a => 
                    a.Name.Contains(input.Filter)||
                    a.Major.Contains(input.Filter)
                );
            }
            var candidates =  query.ToList();

            return candidates;
        }
        //已用
        public void CreateCandidate(CreateCandidateInput input)
        {
            _candidateRepository.Insert(new Candidate()
            {
                CandidateID = input.CandidateID,
                Name = input.Name,
                Sex = input.Sex,
                Class = input.Class,
                CreationTime = input.CreationTime,
                Major = input.Major,
                Remarks = input.Remarks,
            });
        }

        //修改问题
        public void UpdateCandidate(CreateCandidateInput input)
        {
            var candidate = _candidateRepository.Get(input.Id);
            candidate.Name = input.Name;
        }

        //已用
        public CandidateListDto GetCandidateForEdit(EntityDto input)
        {
            var candidate = _candidateRepository.Get(input.Id);
            return new CandidateListDto()
            {
                Id = candidate.Id,
                Name = candidate.Name
            };
        }

        //已用
        public void DeleteCandidate(EntityDto input)
        {
            var candidate = _candidateRepository.Get(input.Id);
            _candidateRepository.Delete(candidate);
        }
    }
}
