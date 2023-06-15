using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class LectureMaterialUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileType",
                table: "LectureMaterials");

            migrationBuilder.RenameColumn(
                name: "Path",
                table: "LectureMaterials",
                newName: "Url");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "LectureMaterials",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "LectureMaterials");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "LectureMaterials",
                newName: "Path");

            migrationBuilder.AddColumn<int>(
                name: "FileType",
                table: "LectureMaterials",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
