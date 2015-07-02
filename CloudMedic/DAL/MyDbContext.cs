using System.Data.Entity;
using CloudMedic.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CloudMedic.DAL
{
    // Usually DbContext, it's IdentityDbContext to pull in ASP.NET Identity Framework's context
    public class MyDbContext : IdentityDbContext<ApplicationUser>
    {
        // Static c'tor to init the Initializer once per app domain (or put in global.asax / Application_Start)
        static MyDbContext()
        {
            // CloudMedicDbInitializer will recreate the database 
            // when model changes
            Database.SetInitializer(new CloudMedicDbInitializer());
        }

        public MyDbContext(bool byPassCipherDb = false)
            : base("MyDbContext", throwIfV1Schema: true)
        {
            if (!byPassCipherDb)
            {
                // power this context with CipherDB
                Crypteron.CipherDb.Session.Create(this);
            }
        }

        public DbSet<MedicationAdministered> MedicationAdministered { get; set; }

        public DbSet<Pharmacy> Pharmacy { get; set; }
        
        public DbSet<Medication> Medication { get; set; }

        // To work with boilerplate code generated in VS2013.3
        public static MyDbContext Create()
        {
            return new MyDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cosmetic : Nicer tables names compared to Identity Framework Defaults
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");

            // Fix the artifacts of the in-built default pluralization
            modelBuilder.Entity<MedicationAdministered>().ToTable("MedicationsAdministered");

            // See this link if you want to change such relationships 
            // http://www.entityframeworktutorial.net/code-first/configure-many-to-many-relationship-in-code-first.aspx
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.MedicationAdministered)
                .WithMany(ma => ma.MedicalTeam)
                .Map(em =>
                {
                    em.ToTable("UserMedicationsAdministered");
                    em.MapLeftKey("UserId");
                    em.MapRightKey("MedicationsAdministeredId");
                });
        }
    }
}