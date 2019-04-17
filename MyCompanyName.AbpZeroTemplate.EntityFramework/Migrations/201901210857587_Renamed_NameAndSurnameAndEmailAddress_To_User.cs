namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Renamed_NameAndSurnameAndEmailAddress_To_User : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AbpUsers", "EmailAddress", c => c.String(maxLength: 256));
            DropColumn("dbo.AbpUsers", "Name");
            DropColumn("dbo.AbpUsers", "Surname");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AbpUsers", "Surname", c => c.String(nullable: false, maxLength: 32));
            AddColumn("dbo.AbpUsers", "Name", c => c.String(nullable: false, maxLength: 32));
            AlterColumn("dbo.AbpUsers", "EmailAddress", c => c.String(nullable: false, maxLength: 256));
        }
    }
}
