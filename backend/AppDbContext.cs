using Microsoft.EntityFrameworkCore;
using backend.Models; // Убедись, что это совпадает с namespace в Book.cs

public class AppDbContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite("Data Source=library.db");
    }
}