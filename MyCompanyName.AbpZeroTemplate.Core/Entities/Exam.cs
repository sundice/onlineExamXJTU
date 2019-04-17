using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Entities
{
    public class Exam : Entity
    {
        public int ExamID { get; set; }
        public string ExamName { get; set; }
        public string CourseName { get; set; }
        public int? Class{ get;set;}
        public DateTime ExamTime { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
    }
}
