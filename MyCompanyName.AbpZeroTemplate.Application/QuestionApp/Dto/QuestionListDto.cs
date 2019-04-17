using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionApp.Dto
{
    [AutoMapFrom(typeof(Question))]
    public class QuestionListDto: EntityDto
    {
        public string QuestionContent { get; set; }
        public string KnowledgePoint { get; set; }
        public int QuestionType { get; set; }

        public string Author { get; set; }
        public string CheckState { get; set; }

        
    }
    public class GetQuestionsOutput
    {  
        public List<QuestionListDto> Questions { get; set; }
    }
}
