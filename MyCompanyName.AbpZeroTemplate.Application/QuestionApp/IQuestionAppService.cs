    using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionApp
{
    public interface IQuestionAppService:IApplicationService
    {
        //PagedResultDto<QuestionListDto> GetQuestions(GetQuestionsInput input);
        Task<PagedResultDto<QuestionListDto>> GetQuestions(GetQuestionsInput input);
        IQueryable<Question> GetSelectItems();
        void CreateQuestion(CreateQuestionInput input);
        void UpdateQuestion(CreateQuestionInput input);
        void DeleteQuestion(EntityDto input);

        QuestionListDto GetQuestionForEdit(EntityDto input);
        string  GetQtChart();
        string GetQcountByQtype(GetQcountByQtypeInput input);
        string GetQuestionsByQtypeInfo(GetQuestionsByQtypeInfoInput input);
    }
}
