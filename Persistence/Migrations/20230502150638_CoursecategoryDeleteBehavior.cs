using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class CoursecategoryDeleteBehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseModules_Courses_CourseId",
                table: "CourseModules");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseModules_Courses_CourseId",
                table: "CourseModules",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseModules_Courses_CourseId",
                table: "CourseModules");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseModules_Courses_CourseId",
                table: "CourseModules",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
