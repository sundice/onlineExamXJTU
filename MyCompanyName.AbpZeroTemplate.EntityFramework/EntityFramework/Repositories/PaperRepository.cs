using Abp.EntityFramework;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.EntityFramework.Repositories
{
    public class PaperRepository : AbpZeroTemplateRepositoryBase<Paper>, IPaperRepository
    {
        public PaperRepository(IDbContextProvider<AbpZeroTemplateDbContext> dbContextProvider) : base(dbContextProvider)
        {

        }
    }
}
