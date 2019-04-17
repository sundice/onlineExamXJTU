using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionApp.Dto
{
    public class GetQuestionsByQtypeInfoInput
    {
        public string CourseName { get; set; }
        public int? Scope { get; set; }
        public string KnowledgePoint { get; set; }
        public int? Choice { get; set; }
        public int? TF { get; set; }
        public int? Blank { get; set; }
        public int? QA { get; set; }
        public int? Program { get; set; }
    }
}
