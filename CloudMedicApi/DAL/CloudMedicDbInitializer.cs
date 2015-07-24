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
    public class CloudMedicDbInitializer : DropCreateDatabaseIfModelChanges<MyDbContext>
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
            var pres = new List<Prescription>
            {
              new Prescription
              {
                Medication = meds[0],
                PrescriptionId = Guid.NewGuid(),
                Patient = p[0],
                Frequency="Twice a day",
                Dosage="Two pills",
                Notes="N/A"
              }
            };
            #endregion

            #region [ Pharmacies ]
            var pharmacies = new List<Pharmacy>
            {
                new Pharmacy
                {
                    PharmacyId = Guid.NewGuid(),
                    Location = "3000 Valley Centre Dr, San Diego, CA 92130",
                    Name = "Sons Pharmacy"
                },
                new Pharmacy
                {
                    PharmacyId = Guid.NewGuid(),
                    Location = "101 W Broadway, San Diego, CA 92101",
                    Name = "Green Cross"
                }
            };
            #endregion

            #region [ MedicationAdministered readings ]
            secDb.MedicationAdministered.Add(new MedicationAdministered()
            {
                Id = Guid.NewGuid(),
                Patient = p[0],
                Medications = new Collection<Medication> { meds[0], meds[1] },
                CareTeam = new Collection<ApplicationUser> { n[0], n[7], dr[0] },
                Pharmacy = pharmacies[0],
                TreatmentDate = PersonRandomizer.GetRandomTime(1)
            });
            secDb.MedicationAdministered.Add(new MedicationAdministered()
            {
                Id = Guid.NewGuid(),
                Patient = p[1],
                Medications = new Collection<Medication> { meds[2], meds[3] },
                CareTeam = new Collection<ApplicationUser> { n[3] , dr[1] },
                Pharmacy = pharmacies[1],
                TreatmentDate = PersonRandomizer.GetRandomTime(1)
            });
            secDb.MedicationAdministered.Add(new MedicationAdministered()
            {
                Id = Guid.NewGuid(),
                Patient = p[0],
                Medications = new Collection<Medication> { meds[0], meds[3] },
                CareTeam = new Collection<ApplicationUser> { n[1], n[2], n[6] , dr[2] },
                Pharmacy = pharmacies[0],
                TreatmentDate = PersonRandomizer.GetRandomTime(1)
            });
            secDb.MedicationAdministered.Add(new MedicationAdministered()
            {
                Id = Guid.NewGuid(),
                Patient = p[2],
                Medications = new Collection<Medication> { meds[0], meds[1], meds[3] },
                CareTeam = new Collection<ApplicationUser> { n[0], n[4], n[5] , dr[0], dr[3] },
                Pharmacy = pharmacies[1],
                TreatmentDate = PersonRandomizer.GetRandomTime(1)
            });
            #endregion

            secDb.SaveChanges();
            #endregion

            base.Seed(secDb);
        }
    }
}