using Microsoft.EntityFrameworkCore;
using MySql.Data;
using System;

namespace Thuisbegymmen
{
    public class Context : DbContext
    {
        //Getter en setter van het Account Model
        public DbSet<Account> Account {get; set;}
        public DbSet<Betaling> Betaling { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
        public DbSet<Favoriet> Favoriet { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Image> Image { get; set; }
        public Context(DbContextOptions<Context> options) : base(options)
        {
            //Empty constructor to provide the connection to the database as a service (see Startup.cs)
        }
        
        // public Context()
        // {
        // }
        
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     //Regelt de connectie met de database, deze waardes moeten aangepast worden als er gebruik wordt gemaakt van een andere database.
        //     optionsBuilder.UseMySql("Server=thuisbegymmen.cwilkyrs0y75.us-east-2.rds.amazonaws.com;Port=3306;Database=thuisbegymmen;User=thuisbegymmen;Password=H0g3sch00l;");
        // }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FreeWeight>();
            modelBuilder.Entity<FixedWeight>();
            modelBuilder.Entity<Accessoires>();
            modelBuilder.Entity<Cardio>();
            modelBuilder.Entity<Bankje>();
            modelBuilder.Entity<KleinFitness>();
            modelBuilder.Entity<Image>();

            modelBuilder.Entity<Favoriet>().HasKey(table => new {
                table.AccountId, table.ProductId
            });

            modelBuilder.Entity<Order>()
                .HasOne<Account>(p => p.Account)
                .WithMany(g => g.Orders)
                .HasForeignKey(p => p.AccountId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<OrderDetail>().HasKey(table => new {    
                table.OrderId, table.ProductId
            });

            modelBuilder.Entity<Betaling>()
                .HasOne(e => e.Account)
                .WithMany(c => c.Betalingen)
                .HasForeignKey(k => k.AccountId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}