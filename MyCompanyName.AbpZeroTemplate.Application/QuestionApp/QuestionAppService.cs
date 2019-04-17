using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AutoMapper;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.QuestionApp.Dto;
using MyCompanyName.AbpZeroTemplate.QuestionsManage;
using System.Linq.Dynamic;
using Abp.Linq.Extensions;
using System.Data.Entity;
using Abp.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace MyCompanyName.AbpZeroTemplate.QuestionApp
{
    public class QuestionAppService:AbpZeroTemplateAppServiceBase,IQuestionAppService
    {
        //构造函数注入
        private readonly IQuestionRepository _questionRepository;
        public QuestionAppService(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }
        //条件筛选
        public async Task<PagedResultDto<QuestionListDto>> GetQuestions(GetQuestionsInput input)
        {
            var query = from question in _questionRepository.GetAll()
                        where question.CreationTime >= input.StartDate && question.CreationTime <= input.EndDate
                        select question;
            query = query.WhereIf(!input.AuthorItem.IsNullOrWhiteSpace(), item => item.Author == input.AuthorItem)
                .WhereIf(!input.CourseItem.IsNullOrWhiteSpace(), item => item.CourseName == input.CourseItem)
                .WhereIf(input.ScopeItem.HasValue, item => item.Scope == input.ScopeItem)
                .WhereIf(input.DegreeItem.HasValue, item => item.Degree == input.DegreeItem)
                .WhereIf(input.QuestionTypeItem.HasValue, item => item.QuestionType == input.QuestionTypeItem);


            var questionCount = await query.CountAsync();
            var questions = await query.OrderBy(input.Sorting).PageBy(input).ToListAsync();

            return new PagedResultDto<QuestionListDto>(
                questionCount,
                questions.MapTo<List<QuestionListDto>>()
                );
        }

        //原始搜索框查询数据库中数据
        //public async Task<PagedResultDto<QuestionListDto>> GetQuestions(GetQuestionsInput input)
        //{
        //    var query = _questionRepository.GetAll();
        //    if (!string.IsNullOrWhiteSpace(input.Filter))
        //    {
        //        query = query.Where(a => a.QuestionContent.Contains(input.Filter));
        //    }  

        //    var questionCount = await query.CountAsync();
        //    var questions = await query.OrderBy(input.Sorting).PageBy(input).ToListAsync();

        //    return new PagedResultDto<QuestionListDto>(
        //        questionCount,
        //        questions.MapTo<List<QuestionListDto>>()
        //        );
        //}
        //查询选择条
        public IQueryable<Question> GetSelectItems()
        {
            var query = _questionRepository.GetAll();
            return query;
        }

        //添加问题
        public void CreateQuestion(CreateQuestionInput input)
        {
             _questionRepository.Insert(new Question() {
                CourseName = input.CourseNameItem,
                Scope = input.ScopeItem,
                KnowledgePoint = input.KnowledgePointItem,
                QuestionType = input.QTypeItem,
                Degree = input.DegreeItem,
                QuestionContent = input.QuestionContentItem,
                Author = input.Author
            });
        }

        //修改问题
        public void UpdateQuestion(CreateQuestionInput input)
        {
            var question = _questionRepository.Get(input.Id);
            question.QuestionContent = input.QuestionContentItem;
        }

        //修改指定id的问题内容
        public QuestionListDto GetQuestionForEdit(EntityDto input)
        {
            var question = _questionRepository.Get(input.Id);
            return new QuestionListDto()
            {
                Id = question.Id,
                QuestionContent = question.QuestionContent
            };
        }
        //删除问题
        public void DeleteQuestion(EntityDto input)
        {
            var question = _questionRepository.Get(input.Id);
            _questionRepository.Delete(question);
        }
        //题库饼图数据
       public string GetQtChart()
        {
            var questionTypeSet = from temp in _questionRepository.GetAll()
                              group temp by temp.QuestionType into question
                              select new
                              {
                                  question.Key,
                                  questionTypeCount = question.Count()
                              };
            var questionTypeList = questionTypeSet.ToList();
            return JsonConvert.SerializeObject(questionTypeList);        
        }
        //根据课程名、章节、知识点筛选出题目，并根据题型将数据分组计数
        public string GetQcountByQtype(GetQcountByQtypeInput input)
        {
            
            var query = from temp in _questionRepository.GetAll()
                        where (temp.CourseName == input.CourseName) && (temp.Scope == input.Scope) && (temp.KnowledgePoint == input.KnowledgePoint)
                        group temp by temp.QuestionType into n
                        select new
                        {
                            n.Key,//Qtype
                            count = n.Count()
                        };
            var queryList = query.ToList();
            var jsonstr =  JsonConvert.SerializeObject(queryList);
            return jsonstr;
        }
        //筛选出符合QtypeINfo界面条件的Question
        public string GetQuestionsByQtypeInfo(GetQuestionsByQtypeInfoInput input)
        {
            var query = from temp in _questionRepository.GetAll()
                        where (temp.CourseName == input.CourseName) && (temp.Scope == input.Scope) && (temp.KnowledgePoint == input.KnowledgePoint)
                        select temp;
            
            if (input.Choice.HasValue && input.Choice > 0)
            {
                query = query.Where(item => item.QuestionType == 1).Take((int)input.Choice);
            }
            if (input.TF.HasValue && input.TF > 0)
            {
                query = query.Where(item => item.QuestionType == 2).Take((int)input.TF);
            }
            if (input.Blank.HasValue && input.Blank > 0)
            {
                query = query.Where(item => item.QuestionType == 3).Take((int)input.Blank);
            }
            if (input.QA.HasValue && input.QA > 0)
            {
                query = query.Where(item => item.QuestionType == 4).Take((int)input.QA);
            }
            if (input.Program.HasValue && input.Program > 0)
            {
                query = query.Where(item => item.QuestionType == 5).Take((int)input.Program);
            }
            var questions = query.ToList();
            var jsonStr = JsonConvert.SerializeObject(questions);
            return jsonStr;
        }
    }
}
