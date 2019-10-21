using GInvestimentos.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GInvestimentos.API.DbContexts
{
    public class GInvDbContext : DbContext
    {
        public DbSet<Autores> Autores { get; set; }

        public GInvDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Autores>().HasKey(x => x.IdAutores);

        }
    }
}
