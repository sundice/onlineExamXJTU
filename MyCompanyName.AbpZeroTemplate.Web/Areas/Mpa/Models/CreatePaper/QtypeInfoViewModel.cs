using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Models.CreatePaper
{
    public class QtypeInfoViewModel
    {
        public string CourseName { get; set; }
        public int? Scope { get; set; }
        public string KnowledgePoint { get; set; }
        public int Index { get;set; }

        public int Choice { get; set; }//1
        public int TF { get; set; }//2
        public int Black { get; set; }//3
        public int QA { get; set; }//4
        public int program { get; set; }//5
        
    }
}