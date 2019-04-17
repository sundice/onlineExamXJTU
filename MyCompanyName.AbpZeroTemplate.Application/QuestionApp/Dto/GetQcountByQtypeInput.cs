using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.QuestionApp.Dto
{
    public class GetQcountByQtypeInput
    {
        public string CourseName { get; set; }
        public int? Scope { get; set; }
        public string KnowledgePoint { get; set; }
    }
}
