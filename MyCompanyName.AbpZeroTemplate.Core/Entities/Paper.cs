using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Entities
{
    public class Paper : Entity, IHasCreationTime, IHasModificationTime
    {
        public int PaperID { get; set; }
        public string PaperName { get; set; }
        public int PaperGroup { get; set; }
        public string PaperContent { get; set; }
        public string Author { get; set; }
        public string Remarks { get; set; }
        public float Degree { get; set; }
        public string State { get; set; }
        public string CourseName { get; set; }

        public DateTime CreationTime { get ; set ; }
        public DateTime? LastModificationTime { get ; set ; }

        public Paper()
        {
            CreationTime = DateTime.Now;
        }
    }
}
