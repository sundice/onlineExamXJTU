using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.PaperApp
{
    public class CreatePaperInput : EntityDto
    {
        public string PaperName { get; set; }
        public string CourseName { get; set; }
        public string State { get; set; }
        public string PaperContent { get; set; }
        public string Remarks { get; set; }
        public float Degree { get; set; }
    }
}