using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class Course_UserPosts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CourseId",
                table: "UserPosts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UserPosts_CourseId",
                table: "UserPosts",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPosts_Courses_CourseId",
                table: "UserPosts",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPosts_Courses_CourseId",
                table: "UserPosts");

            migrationBuilder.DropIndex(
                name: "IX_UserPosts_CourseId",
                table: "UserPosts");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "UserPosts");
        }
    }
}
