using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.PaperApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.PaperApp
{
    public interface IPaperAppService: IApplicationService
    {
        Task<PagedResultDto<PaperListDto>> GetPapers(GetPapersInput input);
        void CreatePaper(CreatePaperInput input);
        void UpdatePaper(CreatePaperInput input);
        void DeletePaper(EntityDto input);

        PaperListDto GetPaperForEdit(EntityDto input);
        PaperListDto GetPaperForBrowse(EntityDto input);

    }
}
