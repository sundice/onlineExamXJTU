namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Question : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuestionID = c.Int(nullable: false),
                        CourseID = c.Int(nullable: false),
                        QuestionContent = c.String(),
                        Answer = c.String(),
                        Scope = c.Int(nullable: false),
                        Degree = c.Int(nullable: false),
                        QuestionType = c.Int(nullable: false),
                        Author = c.String(),
                        Remarks = c.String(),
                        CreationTime = c.DateTime(nullable: false),
                        LastModificationTime = c.DateTime(),
                        Changer = c.String(),
                        Checker = c.String(),
                        CheckState = c.String(),
                        TestCase = c.String(),
                        CanSwap = c.Int(nullable: false),
                        CourseName = c.String(),
                        KnowledgePoint = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Questions");
        }
    }
}
