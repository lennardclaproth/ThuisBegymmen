using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ThuisBegymmen.Migrations
{
    public partial class New : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Gebruikersnaam = table.Column<string>(nullable: false),
                    Wachtwoord = table.Column<string>(nullable: false),
                    Salt = table.Column<string>(nullable: true),
                    Naam = table.Column<string>(nullable: false),
                    Tussenvoegsel = table.Column<string>(nullable: false),
                    Achternaam = table.Column<string>(nullable: false),
                    StraatHuisnr = table.Column<string>(nullable: false),
                    Postcode = table.Column<string>(nullable: false),
                    IsAdmin = table.Column<bool>(nullable: false),
                    EmailAdres = table.Column<string>(nullable: false),
                    Telefoonnummer = table.Column<int>(nullable: true),
                    VerwijderAccount = table.Column<bool>(nullable: false),
                    VerwijderProduct = table.Column<bool>(nullable: false),
                    ToevoegenProduct = table.Column<bool>(nullable: false),
                    VerwijderCategorie = table.Column<bool>(nullable: false),
                    ToevoegenCategorie = table.Column<bool>(nullable: false),
                    Rechten = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderDatum = table.Column<string>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    Comments = table.Column<string>(nullable: false),
                    Naam = table.Column<string>(nullable: true),
                    Achternaam = table.Column<string>(nullable: true),
                    EmailAdres = table.Column<string>(nullable: true),
                    StraatHuisnr = table.Column<string>(nullable: true),
                    Postcode = table.Column<string>(nullable: true),
                    AccountId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Order_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Productnaam = table.Column<string>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Productbeschrijving = table.Column<string>(nullable: false),
                    Breedte = table.Column<int>(nullable: false),
                    Hoogte = table.Column<int>(nullable: false),
                    Lengte = table.Column<int>(nullable: false),
                    Materiaal = table.Column<string>(nullable: true),
                    Kleur = table.Column<string>(nullable: true),
                    Merk = table.Column<string>(nullable: true),
                    Subcategorie = table.Column<string>(nullable: false),
                    Prijs = table.Column<int>(nullable: false),
                    Inventaris = table.Column<int>(nullable: false),
                    VerzendTijd = table.Column<int>(nullable: false),
                    AccountId = table.Column<int>(nullable: true),
                    BankjeIsVerstelbaar = table.Column<bool>(nullable: true),
                    BankjeHeeftBarCatchers = table.Column<bool>(nullable: true),
                    BankjeHeefHalterHouders = table.Column<bool>(nullable: true),
                    CardioWeerstandType = table.Column<string>(nullable: true),
                    OnderhoudsVrij = table.Column<bool>(nullable: true),
                    HeeftScherm = table.Column<bool>(nullable: true),
                    MotorPk = table.Column<int>(nullable: true),
                    TypeLagers = table.Column<string>(nullable: true),
                    FixedWeightBelastbaarGewicht = table.Column<int>(nullable: true),
                    FixedWeightGewicht = table.Column<int>(nullable: true),
                    GebruiktHalterSchijven = table.Column<bool>(nullable: true),
                    FreeWeightBelastbaarGewicht = table.Column<int>(nullable: true),
                    FreeweightGewicht = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Product_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Betaling",
                columns: table => new
                {
                    BetalingId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BetalingsDatum = table.Column<DateTime>(nullable: false),
                    Bedrag = table.Column<double>(nullable: false),
                    status = table.Column<string>(nullable: true),
                    AccountId = table.Column<int>(nullable: false),
                    Iban = table.Column<string>(nullable: true),
                    OrderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Betaling", x => x.BetalingId);
                    table.ForeignKey(
                        name: "FK_Betaling_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Betaling_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Favoriet",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false),
                    AccountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favoriet", x => new { x.AccountId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_Favoriet_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favoriet_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    ImageId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ImageUrl = table.Column<string>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Productnaam = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_Image_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    Hoeveelheid = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    OrderId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => new { x.OrderId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Betaling_AccountId",
                table: "Betaling",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Betaling_OrderId",
                table: "Betaling",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoriet_ProductId",
                table: "Favoriet",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Image_ProductId",
                table: "Image",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_AccountId",
                table: "Order",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_ProductId",
                table: "OrderDetail",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_AccountId",
                table: "Product",
                column: "AccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Betaling");

            migrationBuilder.DropTable(
                name: "Favoriet");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Account");
        }
    }
}
