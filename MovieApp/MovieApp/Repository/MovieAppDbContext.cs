using Microsoft.EntityFrameworkCore;
using MovieApp.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Repository
{
    public class MovieAppDbContext : DbContext
    {
        public MovieAppDbContext(DbContextOptions<MovieAppDbContext> options)
            : base(options)
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var filePath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            optionsBuilder.UseSqlite(@"Data Source="+ filePath + "\\MovieApp.sdf");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActorMovieMap>()
                .HasKey(am => new { am.MovieId, am.ActorId });

            modelBuilder.Entity<ProducerMovieMap>()
                .HasKey(pm => new { pm.MovieId, pm.ProducerId });
        }

        public DbSet<Actor> Actors { get; set; }

        public DbSet<Producer> Producers { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<ActorMovieMap> ActorMovieMap { get; set; }

        public DbSet<ProducerMovieMap> ProducerMovieMap { get; set; }
    }
}
