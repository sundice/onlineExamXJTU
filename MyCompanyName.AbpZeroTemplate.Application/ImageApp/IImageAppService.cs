using Abp.Application.Services;
using MyCompanyName.AbpZeroTemplate.ImageApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.ImageApp
{
    public interface IImageAppService : IApplicationService
    {
        int CreateImageAndReturnID(CreateImageInput input);
    }
}
