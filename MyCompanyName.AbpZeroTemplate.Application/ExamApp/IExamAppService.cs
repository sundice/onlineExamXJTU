using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Entities;
using MyCompanyName.AbpZeroTemplate.ExamApp.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.ExamApp
{
    public interface IExamAppService: IApplicationService
    {
        List<Exam> GetExams(GetExamsInput input);
        void CreateExam(CreateExamInput input);
        void UpdateExam(CreateExamInput input);
        void DeleteExam(EntityDto input);
        ExamListDto GetExamForEdit(EntityDto input);
        List<Exam> GetExamInfo();
    }
}
