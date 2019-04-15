﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Thuisbegymmen;

namespace ThuisBegymmen.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Thuisbegymmen.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Achternaam")
                        .IsRequired();

                    b.Property<string>("EmailAdres")
                        .IsRequired();

                    b.Property<string>("Gebruikersnaam")
                        .IsRequired();

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("Naam")
                        .IsRequired();

                    b.Property<string>("Postcode")
                        .IsRequired();

                    b.Property<bool>("Rechten");

                    b.Property<string>("Salt");

                    b.Property<string>("StraatHuisnr")
                        .IsRequired();

                    b.Property<int?>("Telefoonnummer");

                    b.Property<bool>("ToevoegenCategorie");

                    b.Property<bool>("ToevoegenProduct");

                    b.Property<string>("Tussenvoegsel")
                        .IsRequired();

                    b.Property<bool>("VerwijderAccount");

                    b.Property<bool>("VerwijderCategorie");

                    b.Property<bool>("VerwijderProduct");

                    b.Property<string>("Wachtwoord")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("Thuisbegymmen.Betaling", b =>
                {
                    b.Property<int>("BetalingId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AccountId");

                    b.Property<double>("Bedrag");

                    b.Property<DateTime>("BetalingsDatum");

                    b.Property<string>("Iban");

                    b.Property<int>("OrderId");

                    b.Property<string>("status");

                    b.HasKey("BetalingId");

                    b.HasIndex("AccountId");

                    b.HasIndex("OrderId");

                    b.ToTable("Betaling");
                });

            modelBuilder.Entity("Thuisbegymmen.Favoriet", b =>
                {
                    b.Property<int?>("AccountId");

                    b.Property<int>("ProductId");

                    b.HasKey("AccountId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("Favoriet");
                });

            modelBuilder.Entity("Thuisbegymmen.Image", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ImageUrl")
                        .IsRequired();

                    b.Property<int>("ProductId");

                    b.Property<string>("Productnaam");

                    b.HasKey("ImageId");

                    b.HasIndex("ProductId");

                    b.ToTable("Image");
                });

            modelBuilder.Entity("Thuisbegymmen.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AccountId");

                    b.Property<string>("Achternaam");

                    b.Property<string>("Comments")
                        .IsRequired();

                    b.Property<string>("EmailAdres");

                    b.Property<string>("Naam");

                    b.Property<string>("OrderDatum")
                        .IsRequired();

                    b.Property<string>("Postcode");

                    b.Property<string>("Status")
                        .IsRequired();

                    b.Property<string>("StraatHuisnr");

                    b.HasKey("OrderId");

                    b.HasIndex("AccountId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Thuisbegymmen.OrderDetail", b =>
                {
                    b.Property<int>("OrderId");

                    b.Property<int>("ProductId");

                    b.Property<int>("Hoeveelheid");

                    b.Property<string>("Status");

                    b.HasKey("OrderId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderDetail");
                });

            modelBuilder.Entity("Thuisbegymmen.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AccountId");

                    b.Property<int>("Breedte");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<int>("Hoogte");

                    b.Property<int>("Inventaris");

                    b.Property<string>("Kleur");

                    b.Property<int>("Lengte");

                    b.Property<string>("Materiaal");

                    b.Property<string>("Merk");

                    b.Property<int>("Prijs");

                    b.Property<string>("Productbeschrijving")
                        .IsRequired();

                    b.Property<string>("Productnaam")
                        .IsRequired();

                    b.Property<string>("Subcategorie")
                        .IsRequired();

                    b.Property<int>("VerzendTijd");

                    b.HasKey("ProductId");

                    b.HasIndex("AccountId");

                    b.ToTable("Product");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Product");
                });

            modelBuilder.Entity("Thuisbegymmen.Accessoires", b =>
                {
                    b.HasBaseType("Thuisbegymmen.Product");


                    b.ToTable("Accessoires");

                    b.HasDiscriminator().HasValue("Accessoires");
                });

            modelBuilder.Entity("Thuisbegymmen.Bankje", b =>
                {
                    b.HasBaseType("Thuisbegymmen.Product");

                    b.Property<bool>("BankjeHeefHalterHouders");

                    b.Property<bool>("BankjeHeeftBarCatchers");

                    b.Property<bool>("BankjeIsVerstelbaar");

                    b.ToTable("Bankje");

                    b.HasDiscriminator().HasValue("Bankje");
                });

            modelBuilder.Entity("Thuisbegymmen.Cardio", b =>
                {
                    b.HasBaseType("Thuisbegymmen.Product");

                    b.Property<string>("CardioWeerstandType");

                    b.Property<bool>("HeeftScherm");

                    b.Property<int>("MotorPk");

                    b.Property<bool>("OnderhoudsVrij");

                    b.Property<string>("TypeLagers");

                    b.ToTable("Cardio");

                    b.HasDiscriminator().HasValue("Cardio");
                });

            modelBuilder.Entity("Thuisbegymmen.FixedWeight", b =>
                {
                    b.HasBaseType("Thuisbegymmen.Product");

                    b.Property<int>("FixedWeightBelastbaarGewicht");

                    b.Property<int>("FixedWeightGewicht");

                    b.Property<bool>("GebruiktHalterSchijven");

                    b.ToTable("FixedWeight");

                    b.HasDiscriminator().HasValue("FixedWeight");
                });

            modelBuilder.Entity("Thuisbegymmen.FreeWeight", b =>
                {
                    b.HasBaseType("Thuisbegymmen.Product");

                    b.Property<int>("FreeWeightBelastbaarGewicht");

                    b.Property<int>("FreeweightGewicht");

                    b.ToTable("FreeWeight");

                    b.HasDiscriminator().HasValue("FreeWeight");
                });

            modelBuilder.Entity("Thuisbegymmen.KleinFitness", b =>
                {
                    b.HasBaseType("Thuisbegymmen.Product");


                    b.ToTable("KleinFitness");

                    b.HasDiscriminator().HasValue("KleinFitness");
                });

            modelBuilder.Entity("Thuisbegymmen.Betaling", b =>
                {
                    b.HasOne("Thuisbegymmen.Account", "Account")
                        .WithMany("Betalingen")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Thuisbegymmen.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Thuisbegymmen.Favoriet", b =>
                {
                    b.HasOne("Thuisbegymmen.Account", "Account")
                        .WithMany("Favorieten")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Thuisbegymmen.Product", "Producten")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Thuisbegymmen.Image", b =>
                {
                    b.HasOne("Thuisbegymmen.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Thuisbegymmen.Order", b =>
                {
                    b.HasOne("Thuisbegymmen.Account", "Account")
                        .WithMany("Orders")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.SetNull);
                });

            modelBuilder.Entity("Thuisbegymmen.OrderDetail", b =>
                {
                    b.HasOne("Thuisbegymmen.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Thuisbegymmen.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Thuisbegymmen.Product", b =>
                {
                    b.HasOne("Thuisbegymmen.Account")
                        .WithMany("Producten")
                        .HasForeignKey("AccountId");
                });
#pragma warning restore 612, 618
        }
    }
}
