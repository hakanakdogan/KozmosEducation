using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class UserPostsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPosts_AspNetUsers_AppUserId1",
                table: "UserPosts");

            migrationBuilder.DropIndex(
                name: "IX_UserPosts_AppUserId1",
                table: "UserPosts");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "UserPosts");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "UserPosts",
                type: "text",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_UserPosts_AppUserId",
                table: "UserPosts",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPosts_AspNetUsers_AppUserId",
                table: "UserPosts",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPosts_AspNetUsers_AppUserId",
                table: "UserPosts");

            migrationBuilder.DropIndex(
                name: "IX_UserPosts_AppUserId",
                table: "UserPosts");

            migrationBuilder.AlterColumn<Guid>(
                name: "AppUserId",
                table: "UserPosts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "UserPosts",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPosts_AppUserId1",
                table: "UserPosts",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPosts_AspNetUsers_AppUserId1",
                table: "UserPosts",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
