using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Linq.Extensions;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.ExamApp.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.ExamApp
{
    public class ExamAppService : AbpZeroTemplateAppServiceBase, IExamAppService
    {
        //构造函数注入
        private readonly IExamRepository _examRepository;
        public ExamAppService(IExamRepository examRepository)
        {
            _examRepository = examRepository;
        }
        //查询
        public List<Exam> GetExams(GetExamsInput input)
        {
            var query = _examRepository.GetAll();
            if (!string.IsNullOrWhiteSpace(input.Filter))
            {
                query = query.Where(a => 
                    a.ExamName.Contains(input.Filter)||
                    a.CourseName.Contains(input.Filter)
                );
            }
            var exams =  query.ToList();

            return exams;
        }
        //已用
        public void CreateExam(CreateExamInput input)
        {
            _examRepository.Insert(new Exam()
            {
                ExamName = input.ExamName,
                CourseName = input.CourseName,
                Class = input.Class,
                ExamTime = input.ExamTime,
                Status = input.Status,
                Remarks = input.Remarks,
            });
        }

        //修改问题
        public void UpdateExam(CreateExamInput input)
        {
            var exam = _examRepository.Get(input.Id);
            exam.ExamName = input.ExamName;
        }

        //已用
        public ExamListDto GetExamForEdit(EntityDto input)
        {
            var exam = _examRepository.Get(input.Id);
            return new ExamListDto()
            {
                Id = exam.Id,
                ExamName = exam.ExamName
            };
        }
        //已用
        public List<Exam> GetExamInfo()
        {
            var examInfo = _examRepository.GetAll().ToList();
            return examInfo;
        }
        //已用
        public void DeleteExam(EntityDto input)
        {
            var exam = _examRepository.Get(input.Id);
            _examRepository.Delete(exam);
        }
    }
}
