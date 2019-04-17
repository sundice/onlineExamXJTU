using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionsManage
{
    public class Question : Entity,IHasCreationTime,IHasModificationTime
    {
        public int QuestionID { get; set; }
        public int? CourseID { get; set; }
        public string QuestionContent { get; set; }
        public string Answer { get; set; }
        public int? Scope { get; set; }
        public int? Degree { get; set; }
        public int QuestionType { get; set; }
        public string Author { get; set; }
        public string Remarks { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

        public string Changer { get; set; }
        public string Checker { get; set; }
        public string CheckState { get; set; }
        public string TestCase { get; set; }
        public int? CanSwap { get; set; }
        public string CourseName { get; set; }

        public string KnowledgePoint { get; set; }

        public Question()
        {
            CreationTime = DateTime.Now;
        }
    }
}
