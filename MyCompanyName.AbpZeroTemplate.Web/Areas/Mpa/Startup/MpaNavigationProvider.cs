using Abp.Application.Navigation;
using Abp.Localization;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.Web.Navigation;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Mpa.Startup
{
    public class MpaNavigationProvider : NavigationProvider
    {
        public const string MenuName = "Mpa";
        
        public override void SetNavigation(INavigationProviderContext context)
        {
            var menu = context.Manager.Menus[MenuName] = new MenuDefinition(MenuName, new FixedLocalizableString("Main Menu"));

            menu
                .AddItem(new MenuItemDefinition(
                    PageNames.App.Host.Tenants,
                    L("Tenants"),
                    url: "Mpa/Tenants",
                    icon: "icon-globe",
                    requiredPermissionName: AppPermissions.Pages_Tenants
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Host.Exhibition,//展览
                    L("Exhibition"),
                    url:"Mpa/Welcome",
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_Exhibition                    
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Host.QuestionsManage,//题库管理
                    L("QuestionsManage"),
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_QuestionsManage
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.QuestionBrowse,
                        L("QuestionBrowse"),//试题浏览
                        url: "Mpa/Question",
                        icon: "icon-layers"
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.QuestionCreate,
                        L("QuestionCreate"),//添加试题
                        url: "Mpa/Question/CreateQuestion",
                        icon: "icon-layers"
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.CourseManage,
                        L("CourseManage"),//课程管理
                        url: "Mpa/Course",
                        icon: "icon-layers"
                        )
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Host.PapersManage,//试卷管理
                    L("PapersManage"),
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_PapersManage
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.PaperBrowse,
                        L("PaperBrowse"),//浏览试卷
                        url: "Mpa/Paper",
                        icon: "icon-layers"
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.PaperCreate,
                        L("PaperCreate"),//组卷
                        url: "Mpa/CreatePaper",
                        icon: "icon-layers"
                        )
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Host.ExamsManage,//考务管理
                    L("ExamsManage"),
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_ExamsManage
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.ExamManage,//控制菜单是否被选中
                        L("ExamManage"),//考试管理
                        url: "Mpa/Exam",
                        icon: "icon-layers"
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.CandidateManage,
                        L("CandidateManage"),//考生管理
                        url: "Mpa/Candidate",
                        icon: "icon-layers"
                        )
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Host.Editions,
                    L("Editions"),
                    url: "Mpa/Editions",
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_Editions
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Tenant.Dashboard,
                    L("Dashboard"),
                    url: "Mpa/Dashboard",
                    icon: "icon-home",
                    requiredPermissionName: AppPermissions.Pages_Tenant_Dashboard
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Tenant.Test,//一个常量，控制菜单是否被选中
　　                L("Test"),//菜单显示名称，在语言文件中配置
　　                url: "Mpa/Test/PaperInfo",//菜单路径
　　                icon: "icon-globe"//菜单图标
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Common.Administration,
                    L("Administration"),
                    icon: "icon-wrench"
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.OrganizationUnits,
                        L("OrganizationUnits"),
                        url: "Mpa/OrganizationUnits",
                        icon: "icon-layers",
                        requiredPermissionName: AppPermissions.Pages_Administration_OrganizationUnits
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Roles,
                        L("Roles"),
                        url: "Mpa/Roles",
                        icon: "icon-briefcase",
                        requiredPermissionName: AppPermissions.Pages_Administration_Roles
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Users,
                        L("Users"),
                        url: "Mpa/Users",
                        icon: "icon-users",
                        requiredPermissionName: AppPermissions.Pages_Administration_Users
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Languages,
                        L("Languages"),
                        url: "Mpa/Languages",
                        icon: "icon-flag",
                        requiredPermissionName: AppPermissions.Pages_Administration_Languages
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.AuditLogs,
                        L("AuditLogs"),
                        url: "Mpa/AuditLogs",
                        icon: "icon-lock",
                        requiredPermissionName: AppPermissions.Pages_Administration_AuditLogs
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.Maintenance,
                        L("Maintenance"),
                        url: "Mpa/Maintenance",
                        icon: "icon-wrench",
                        requiredPermissionName: AppPermissions.Pages_Administration_Host_Maintenance
                        )
                    )
                    .AddItem(new MenuItemDefinition(
                        PageNames.App.Host.Settings,
                        L("Settings"),
                        url: "Mpa/HostSettings",
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Administration_Host_Settings
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Tenant.Settings,
                        L("Settings"),
                        url: "Mpa/Settings",
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Administration_Tenant_Settings
                        )
                    )
                );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AbpZeroTemplateConsts.LocalizationSourceName);
        }
    }
}