using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<VerificationLog> VerificationLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Define foreign key relationships
            modelBuilder.Entity<Document>()
                .HasOne(d => d.User)
                .WithMany(u => u.Documents)
                .HasForeignKey(d => d.UserId);

            modelBuilder.Entity<VerificationLog>()
                .HasOne(v => v.Document)
                .WithMany(d => d.VerificationLogs)
                .HasForeignKey(v => v.DocumentId);
        }

        // Seeding data
        public static void Seed(ModelBuilder modelBuilder)
        {
            // Sample Users
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Admin User", Email = "admin@elm.com", Password = "admin123", Role = "Admin" },
                new User { Id = 2, Name = "John Doe", Email = "john.doe@elm.com", Password = "password123", Role = "User" }
            );

            // Sample Documents
            modelBuilder.Entity<Document>().HasData(
                new Document { Id = 1, UserId = 1, Title = "Admin Document", FilePath = "C:/Documents/admin1.pdf", VerificationCode = "ABC123", Status = "Pending", CreatedAt = DateTime.UtcNow },
                new Document { Id = 2, UserId = 2, Title = "John's Document", FilePath = "C:/Documents/john1.pdf", VerificationCode = "XYZ456", Status = "Verified", CreatedAt = DateTime.UtcNow }
            );
        }
    }
}
