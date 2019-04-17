using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Linq.Extensions;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.PaperApp.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.PaperApp
{
    public class PaperAppService : AbpZeroTemplateAppServiceBase, IPaperAppService
    {
        //构造函数注入
        private readonly IPaperRepository _paperRepository;
        public PaperAppService(IPaperRepository paperRepository)
        {
            _paperRepository = paperRepository;
        }
        //查询
        public async Task<PagedResultDto<PaperListDto>> GetPapers(GetPapersInput input)
        {
            var query = _paperRepository.GetAll();
            if (!string.IsNullOrWhiteSpace(input.Filter))
            {
                query = query.Where(a => a.PaperName.Contains(input.Filter));
            }

            var paperCount = await query.CountAsync();
            var papers = await query.OrderBy(input.Sorting).PageBy(input).ToListAsync();

            return new PagedResultDto<PaperListDto>(
                paperCount,
                papers.MapTo<List<PaperListDto>>()
                );
        }
        //添加问题
        public void CreatePaper(CreatePaperInput input)
        {
            _paperRepository.Insert(new Paper()
            {
                PaperName = input.PaperName,
                CourseName = input.CourseName,
                State = input.State,
                Remarks = input.Remarks,
                Degree = input.Degree,
                PaperContent = input.PaperContent
            });
        }

        //修改问题
        public void UpdatePaper(CreatePaperInput input)
        {
            var paper = _paperRepository.Get(input.Id);
            paper.PaperName = input.PaperName;
        }

        //修改指定id的问题内容
        public PaperListDto GetPaperForEdit(EntityDto input)
        {
            var paper = _paperRepository.Get(input.Id);
            return new PaperListDto()
            {
                Id = paper.Id,
                PaperName = paper.PaperName
            };
        }
        //修改指定id的问题内容
        public PaperListDto GetPaperForBrowse(EntityDto input)
        {
            var paper = _paperRepository.Get(input.Id);
            return new PaperListDto()
            {
                Id = paper.Id,
                PaperName = paper.PaperName,
                Author = paper.Author,
                Degree = paper.Degree
                
                
            };
        }
        //删除问题
        public void DeletePaper(EntityDto input)
        {
            var paper = _paperRepository.Get(input.Id);
            _paperRepository.Delete(paper);
        }
    }
}
