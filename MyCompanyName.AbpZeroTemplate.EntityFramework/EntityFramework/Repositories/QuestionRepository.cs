using Abp.EntityFramework;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.EntityFramework.Repositories
{
    public class QuestionRepository:AbpZeroTemplateRepositoryBase<Question>,IQuestionRepository
    {
        public QuestionRepository(IDbContextProvider<AbpZeroTemplateDbContext> dbContextProvider) : base(dbContextProvider)
        {

        }
    }
}
