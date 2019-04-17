using Abp.EntityFramework;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.EntityFramework.Repositories
{
    public class ImageRepository : AbpZeroTemplateRepositoryBase<Image>, IImageRepository
    {
        public ImageRepository(IDbContextProvider<AbpZeroTemplateDbContext> dbContextProvider) : base(dbContextProvider)
        {

        }
    }
}
