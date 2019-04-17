using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Entities
{
    public class Course : Entity
    {
        public int CourseID { get; set; }
        public string CourseName { get; set; }
        public int? Scope { get; set; }
        public string KnowledgePoint { get; set; }
    }
}
