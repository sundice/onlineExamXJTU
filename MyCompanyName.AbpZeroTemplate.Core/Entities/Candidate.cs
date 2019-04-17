using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Entities
{
    public class Candidate : Entity
    {
        public int CandidateID { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public int? Class { get; set; }
        public string Major { get; set; }
        public string CreationTime { get; set; }
        public string Remarks { get; set; }
    }
}
