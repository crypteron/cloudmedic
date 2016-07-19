using System.Data.Entity;
using CloudMedicApi.Models;
using CloudMedicApi.Utility;
using Microsoft.AspNet.Identity.EntityFramework;
using Crypteron;

namespace CloudMedicApi.DAL
{
    // Usually DbContext, it's IdentityDbContext to pull in ASP.NET Identity Framework's context
    public class MyDbContext : IdentityDbContext<ApplicationUser>
    {
        static MyDbContext()
        {
            var myCrypteronAccount = new Crypteron.ConfigFile.MyCrypteronAccount()
            {
                // Copy over other values too?  
                AppSecret = System.Configuration.ConfigurationManager.AppSettings["secretcode"]
        };

            CrypteronConfig.Config.MyCrypteronAccount = myCrypteronAccount;
            // Init code-first database, switch in production!
#if DEBUG
            Database.SetInitializer(new CloudMedicDbInitializer()); // Development
#else
            if (DbSetup.CheckForTables()) { //if there are no tables
                Database.SetInitializer<MyDbContext>(null); // Production
                DbSetup.Page_Load();
                new CloudMedicDbInitializer();
            }

#endif
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

        public DbSet<Pharmacy> Pharmacy { get; set; }
        
        public DbSet<Medication> Medication { get; set; }

        public DbSet<Prescription> Prescription { get; set; }

        public DbSet<CareTeam> CareTeam { get; set; }

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
            //modelBuilder.Entity<MedicationAdministered>().ToTable("MedicationsAdministered");

            // See this link if you want to change such relationships 
            // http://www.entityframeworktutorial.net/code-first/configure-many-to-many-relationship-in-code-first.aspx

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.ProviderCareTeams)
                .WithMany(p => p.Providers)
                .Map(em =>
                {
                    em.ToTable("UserProviderCareTeams");
                    em.MapLeftKey("UserId");
                    em.MapRightKey("CareTeamId");
                });

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.SupporterCareTeams)
                .WithMany(s => s.Supporters)
                .Map(em =>
                {
                    em.ToTable("UserSupporterCareTeams");
                    em.MapLeftKey("UserId");
                    em.MapRightKey("CareTeamId");
                });
        }
    }
}