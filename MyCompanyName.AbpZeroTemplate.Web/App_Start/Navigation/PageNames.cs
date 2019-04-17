namespace MyCompanyName.AbpZeroTemplate.Web.Navigation
{
    public static class PageNames
    {
        public static class App
        {
            public static class Common
            {
                public const string Administration = "Administration";
                public const string Roles = "Administration.Roles";
                public const string Users = "Administration.Users";
                public const string AuditLogs = "Administration.AuditLogs";
                public const string OrganizationUnits = "Administration.OrganizationUnits";
                public const string Languages = "Administration.Languages";
            }

            public static class Host
            {
                public const string Tenants = "Tenants";

                public const string Exhibition = "Exhibition";//展览

                public const string QuestionsManage = "QuestionsManage";//题库管理
                public const string QuestionBrowse = "QuestionBrowse";//试题浏览
                public const string QuestionCreate = "QuestionCreate";//试卷浏览
                public const string CourseManage = "CourseManage";//章节管理

                public const string PapersManage = "PapersManage";//试卷管理
                public const string PaperBrowse = "PaperBrowse";//试卷浏览
                public const string PaperCreate = "PaperCreate";//试卷创建

                public const string ExamsManage = "ExamsManage";//考务管理
                public const string ExamManage = "ExamManage";//考试管理
                public const string CandidateManage = "CandidateManage";//考生管理

                public const string Editions = "Editions";
                public const string Maintenance = "Administration.Maintenance";
                public const string Settings = "Administration.Settings.Host";

            }

            public static class Tenant
            {
                public const string Dashboard = "Dashboard.Tenant";
                public const string Settings = "Administration.Settings.Tenant";
                public const string Test = "Test";//这里是添加的常量
            }
        }

        public static class Frontend
        {
            public const string Home = "Frontend.Home";
            public const string About = "Frontend.About";
        }
    }
}