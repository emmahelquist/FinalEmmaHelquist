using Microsoft.EntityFrameworkCore;

namespace _413Final.API.Data;

public class EntertainerDbContext : DbContext
{
    public EntertainerDbContext(DbContextOptions<EntertainerDbContext> options) : base(options)
    {
        
    }
    
    // table name
    public DbSet<Entertainer> Entertainers { get; set; }
    public DbSet<Engagement> Engagements { get; set; }

}