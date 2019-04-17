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

                public const string Exhibition = "Exhibition";//չ��

                public const string QuestionsManage = "QuestionsManage";//������
                public const string QuestionBrowse = "QuestionBrowse";//�������
                public const string QuestionCreate = "QuestionCreate";//�Ծ����
                public const string CourseManage = "CourseManage";//�½ڹ���

                public const string PapersManage = "PapersManage";//�Ծ����
                public const string PaperBrowse = "PaperBrowse";//�Ծ����
                public const string PaperCreate = "PaperCreate";//�Ծ���

                public const string ExamsManage = "ExamsManage";//�������
                public const string ExamManage = "ExamManage";//���Թ���
                public const string CandidateManage = "CandidateManage";//��������

                public const string Editions = "Editions";
                public const string Maintenance = "Administration.Maintenance";
                public const string Settings = "Administration.Settings.Host";

            }

            public static class Tenant
            {
                public const string Dashboard = "Dashboard.Tenant";
                public const string Settings = "Administration.Settings.Tenant";
                public const string Test = "Test";//��������ӵĳ���
            }
        }

        public static class Frontend
        {
            public const string Home = "Frontend.Home";
            public const string About = "Frontend.About";
        }
    }
}