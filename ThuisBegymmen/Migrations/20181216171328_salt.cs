using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ThuisBegymmen.Migrations
{
    public partial class salt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Betaling_Account_AccountId",
                table: "Betaling");

            migrationBuilder.AlterColumn<int>(
                name: "AccountId",
                table: "Betaling",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<byte[]>(
                name: "Salt",
                table: "Account",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Betaling_Account_AccountId",
                table: "Betaling",
                column: "AccountId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Betaling_Account_AccountId",
                table: "Betaling");

            migrationBuilder.AlterColumn<int>(
                name: "AccountId",
                table: "Betaling",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Salt",
                table: "Account",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Betaling_Account_AccountId",
                table: "Betaling",
                column: "AccountId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
