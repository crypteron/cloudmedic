using System.Collections.ObjectModel;
using CloudMedicApi.BLL;
using CloudMedicApi.Models;
using CloudMedicApi.Utility;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CloudMedicApi.DAL
{

    /// <summary>
    /// This will initialize our code-first database model. 
    /// Currently tweaked for rapid development (e.g. DropCreateDatabaseAlways or 
    /// DropCreateDatabaseIfModelChanges, Seed data, test accounts etc). 
    /// Alter for production as needed
    /// </summary>
    public class CloudMedicDbInitializer : DropCreateDatabaseAlways<MyDbContext>
    {      
        protected override void Seed(MyDbContext myDbContext)
        {
            // See http://www.asp.net/mvc/overview/getting-started/getting-started-with-ef-using-mvc/migrations-and-deployment-with-the-entity-framework-in-an-asp-net-mvc-application
            // if you wish to customize it

            // We need to enable CipherDB for this session
            var secDb = Crypteron.CipherDb.Session.Create(myDbContext);

            #region [ Mandatory seed data for app ]

            // Add all roles, since Identity framework wants string as Id key
            // we just do int => string
            var roles = Enum.GetNames(typeof (RoleId));
            foreach (var role in roles)
            {
                var roleEntry = new IdentityRole(role);
                roleEntry.Id = RoleManager.GetRoleId(role);
                secDb.Roles.Add(roleEntry);
            }
            secDb.SaveChanges();

            // Create system admin
            var admin = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Clark",
                LastName = "Kent",
                DateOfBirth = new DateTime(1900, 1, 1),
                GenderEnum = GenderEnum.Male,
                Email = "administrator@cloudmedic.io",
                PhoneNumber = "",
                PhoneNumberConfirmed = true,
                EmailConfirmed = true,
                UserName = "administrator",
                Specialty = ""
            };
            admin.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.SysAdmin),
                UserId = admin.Id
            });
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(secDb));
            var result = manager.Create(admin, "cloudmedicrocks");
            if (!result.Succeeded)
                throw new Exception("Couldn't create system administrator");

            #endregion

            #region [ Seeding for test usage ]
            // Test users
            var examplePatient = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Example",
                LastName = "User",
                DOB = (new DateTime(1950, 3, 3)).ToString(),
                GenderEnum = GenderEnum.Male,
                Email = "patient@example.com",
                PhoneNumber = "(123) 456-7890",
                PhoneNumberConfirmed = true,
                EmailConfirmed = true,
                UserName = "Patient1",
                Specialty = ""
            };
            examplePatient.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Patient),
                UserId = examplePatient.Id
            });
            var result1 = manager.Create(examplePatient, "Password1!");
            if (!result1.Succeeded)
                throw new Exception("Couldn't create test patient");

            var exampleDoctor = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Example",
                LastName = "User",
                DOB = (new DateTime(1950, 3, 3)).ToString(),
                GenderEnum = GenderEnum.Male,
                Email = "doctor@example.com",
                PhoneNumber = "(123) 456-7890",
                PhoneNumberConfirmed = true,
                EmailConfirmed = true,
                UserName = "Doctor1",
                Specialty = ""
            };
            exampleDoctor.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Physician),
                UserId = exampleDoctor.Id
            });
            var result2 = manager.Create(exampleDoctor, "Password1?");
            if (!result2.Succeeded)
                throw new Exception("Couldn't create test physician");

            var exampleSupporter = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Example",
                LastName = "Supporter",
                DOB = (new DateTime(1950, 3, 3)).ToString(),
                GenderEnum = GenderEnum.Male,
                Email = "supporter@example.com",
                PhoneNumber = "(123) 456-7890",
                PhoneNumberConfirmed = true,
                EmailConfirmed = true,
                UserName = "Supporter1",
                Specialty = ""
            };
            exampleSupporter.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Supporter),
                UserId = exampleSupporter.Id
            });
            var result3 = manager.Create(exampleSupporter, "Password1.");
            if (!result3.Succeeded)
                throw new Exception("Couldn't create test supporter");

            // Patients
            var p = new List<ApplicationUser>();
            for (var i = 0; i < 12; i++)
            {
                p.Add(PersonRandomizer.CreateRandomPatient());
            }

            // Nurses
            var n = new List<ApplicationUser>();
            for (var i = 0; i < 8; i++)
            {
                n.Add(PersonRandomizer.CreateRandomNurse());
            }

            // Physicians
            var dr = new List<ApplicationUser>();
            for (var i = 0; i < 4; i++)
            {
                dr.Add(PersonRandomizer.CreateRandomPhysician());
            }

            // Supporters
            var s = new List<ApplicationUser>();
            for (var i = 0; i < 6; i++)
            {
                s.Add(PersonRandomizer.CreateRandomSupporter());
            }

            #region [ Medications ]
            var meds = new List<Medication>
            {
                new Medication
                {
                    Code = "50410",
                    GenericName = "Aspirin",
                    MedicationId = Guid.NewGuid()
                },
                new Medication
                {
                    Code = "52730",
                    GenericName = "Ibuprofen",
                    MedicationId = Guid.NewGuid()
                },
                new Medication
                {
                    Code = "50005",
                    GenericName = "Acetaminophen",
                    MedicationId = Guid.NewGuid()
                },
                new Medication
                {
                    Code = "52790",
                    GenericName = "Insulin",
                    MedicationId = Guid.NewGuid()
                },
                new Medication
                {
                    Code = "52411",
                    GenericName = "Loratadine",
                    MedicationId = Guid.NewGuid()
                },
                new Medication
                {
                    Code = "50161",
                    GenericName = "Hydrocortisone",
                    MedicationId = Guid.NewGuid()
                }
            };
            #endregion

            #region [ Prescriptions ]
            secDb.Prescription.Add(new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Dosage = "Twice a day",
                Frequency = "2 tablets",
                StartDate = (new DateTime(2015, 7, 25)).ToString(),
                EndDate = (new DateTime(2015, 8, 31)).ToString(),
                Notes = "Stop using this medication and call your doctor at once if you have any of these serious side effects: black, bloody, or tarry stools; coughing up blood or vomit that looks like coffee grounds; severe nausea, vomiting, or stomach pain; fever lasting longer than 3 days;swelling, or pain lasting longer than 10 days",
                Medication = meds[5],
                Patient = examplePatient
            });
            secDb.Prescription.Add(new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Dosage = "Once a day",
                Frequency = "1 mg",
                StartDate = (new DateTime(2015, 7, 20)).ToString(),
                EndDate = (new DateTime(2015, 7, 24)).ToString(),
                Notes = "Brand names: Solu-cortef, Anucort-hc, Locoid, Westcort, Cortifoam, Pandel, A-hydrocort, Colocort, U-cort, Caldecort, Alacort, Procto-Kit, MiCort-HC, Cortef, CortAlo, Proctocort, Texacort, Hytone, Maximum-H, Theracort, Poli-A",
                Medication = meds[3],
                Patient = p[3]
            });
            secDb.Prescription.Add(new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Dosage = "Every 6 hours",
                Frequency = "2 mg",
                StartDate = (new DateTime(2015, 8, 20)).ToString(),
                EndDate = (new DateTime(2015, 10, 24)).ToString(),
                Notes = "Brand names: Tylenol, Panadol, Mapap, Tempra, Ofirmev, Feverall, Formula: C8H9NO2; Pregnancy risk: Category C(Risk cannot be ruled out)Medication = meds[4]",
                Medication = meds[1],
                Patient = p[2]
            });
            secDb.Prescription.Add(new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Dosage = "Once a day",
                Frequency = "2 pills",
                StartDate = (new DateTime(2015, 7, 23)).ToString(),
                EndDate = (new DateTime(2015, 9, 24)).ToString(),
                Notes = "Brand names: Solu-cortef, Anucort-hc, Locoid, Westcort, Cortifoam, Pandel, A-hydrocort, Colocort, U-cort, Caldecort, Alacort, Procto-Kit, MiCort-HC, Cortef, CortAlo, Proctocort, Texacort, Hytone, Maximum-H, Theracort, Poli-A",
                Medication = meds[4],
                Patient = p[6]
            });
            secDb.Prescription.Add(new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Dosage = "Once a week",
                Frequency = "5 mg",
                StartDate = (new DateTime(2015, 7, 26)).ToString(),
                EndDate = (new DateTime(2015, 10, 24)).ToString(),
                Notes = "Brand names: Advil, Midol, NeoProfen, Caldolor, Motrin, Ibu",
                Medication = meds[2],
                Patient = p[1]
            });
            secDb.Prescription.Add(new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Dosage = "Once a week",
                Frequency = "5 mg",
                StartDate = (new DateTime(2015, 7, 26)).ToString(),
                EndDate = (new DateTime(2015, 10, 24)).ToString(),
                Notes = "Brand names: Advil, Midol, NeoProfen, Caldolor, Motrin, Ibu",
                Medication = meds[0],
                Patient = p[8]
            });
            #endregion

            #region [ CareTeams ]
            secDb.CareTeam.Add(new CareTeam()
            {
                Id = Guid.NewGuid(),
                Name = "Justice League",
                Active = true,
                Providers = new Collection<ApplicationUser> { n[0], n[7], n[2], n[4], dr[0], dr[2] },
                Supporters = new Collection<ApplicationUser> { exampleSupporter, s[3], s[5] },
                Patient = p[4]
            });
            secDb.CareTeam.Add(new CareTeam()
            {
                Id = Guid.NewGuid(),
                Name = "Suicide Squad",
                Active = true,
                Providers = new Collection<ApplicationUser> { n[3], n[1], n[5], n[6], dr[1], dr[3] },
                Supporters = new Collection<ApplicationUser> { s[1], s[4], s[2] },
                Patient = p[3]
            });
            secDb.CareTeam.Add(new CareTeam()
            {
                Id = Guid.NewGuid(),
                Name = "The Avengers",
                Active = true,
                Providers = new Collection<ApplicationUser> { n[0], n[4], n[5], dr[0], exampleDoctor },
                Supporters = new Collection<ApplicationUser> { exampleSupporter, s[0], s[2] },
                Patient = examplePatient
            });
            #endregion

            secDb.SaveChanges();
            #endregion

            base.Seed(secDb);
        }
    }
}