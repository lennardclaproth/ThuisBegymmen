using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ThuisBegymmen.Migrations
{
    public partial class salt1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Salt",
                table: "Account",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Salt",
                table: "Account",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
