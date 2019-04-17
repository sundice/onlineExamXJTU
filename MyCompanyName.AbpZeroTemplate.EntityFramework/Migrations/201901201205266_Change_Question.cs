namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Question : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Questions", "CourseID", c => c.Int());
            AlterColumn("dbo.Questions", "Scope", c => c.Int());
            AlterColumn("dbo.Questions", "Degree", c => c.Int());
            AlterColumn("dbo.Questions", "CanSwap", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Questions", "CanSwap", c => c.Int(nullable: false));
            AlterColumn("dbo.Questions", "Degree", c => c.Int(nullable: false));
            AlterColumn("dbo.Questions", "Scope", c => c.Int(nullable: false));
            AlterColumn("dbo.Questions", "CourseID", c => c.Int(nullable: false));
        }
    }
}
