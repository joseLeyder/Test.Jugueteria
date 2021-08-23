using Microsoft.EntityFrameworkCore.Migrations;

namespace Test.Jugueteria.DataAccess.Contracts.Migrations
{
    public partial class AgregarPathFoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PathFoto",
                table: "Producto",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathFoto",
                table: "Producto");
        }
    }
}
