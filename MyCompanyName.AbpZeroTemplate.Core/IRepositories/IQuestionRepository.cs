using Abp.Domain.Repositories;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.IRepositories
{
    public interface IQuestionRepository : IRepository<Question>
    {
    }
}
