namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Paper : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Papers", "PaperName", c => c.String());
            AddColumn("dbo.Papers", "State", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Papers", "State");
            DropColumn("dbo.Papers", "PaperName");
        }
    }
}
