namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Paper : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Papers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PaperID = c.Int(nullable: false),
                        PaperGroup = c.Int(nullable: false),
                        PaperContent = c.String(),
                        Author = c.String(),
                        Remarks = c.String(),
                        Degree = c.Single(nullable: false),
                        CourseName = c.String(),
                        CreationTime = c.DateTime(nullable: false),
                        LastModificationTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Papers");
        }
    }
}
