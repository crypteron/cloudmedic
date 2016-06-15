using System;
using CloudMedicApi.BLL;
using CloudMedicApi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Crypteron.Entropy;

namespace CloudMedicApi.Utility
{
    public class PersonRandomizer : Randomizer
    {
        #region [ string constants ]
        private readonly string[] _items =
        {
            "Apples", "Ball", "Cellphone", "DVD player", "Ear covers", "Firewood", "Glasses", "Headset",
            "Ink", "Jam", "Keyboard", "Lens Cover", "Magazine", "Notebook", "Oranges", "Pail",
            "Quiver", "Raincoat", "Saddle", "Truffles", "Underwater camera", "Visor", "Xbox", "Yams", "Zebra"
        };

        private static readonly string[] FirstNames =
        {
            "Albert", "Beethoven", "Cherry", "Derrek", "Einstein", "Frank", "Gina", "Hank", "Igor", "Janice",
            "Kelly", "Lisa", "Mike", "Nancy", "Olga", "Perry", "Quincy", "Randy", "Sid", "Tracy", "Ursula",
            "Victoria", "Wendy", "Xin", "Yanni", "Zack"
        };

        private static readonly string[] LastNames =
        {
            "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis",
            "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin",
            "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker",
            "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson",
            "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres",
            "Parker", "Collins", "Edwards", "Stewart", "Flores", "Morris"
        };

        private static readonly string[] Specialties = { "Cardiology", "General Practice", "Gynecology", "Psychiatry", "Pediatrics", "Internal Medicine" };
        #endregion

        public static ApplicationUser CreateRandomPatient()
        {
            var p = CreateRandomPerson();

            p.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Patient),
                UserId = p.Id
            });
            return p;
        }

        public static ApplicationUser CreateRandomPhysician()
        {
            var p = CreateRandomPerson();
            p.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Physician),
                UserId = p.Id
            });

            p.Specialty = GetRandom(Specialties);
            return p;
        }

        public static ApplicationUser CreateRandomNurse()
        {
            var p = CreateRandomPerson();
            p.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Nurse),
                UserId = p.Id
            });

            return p;
        }

        public static ApplicationUser CreateRandomSupporter()
        {
            var s = CreateRandomPerson();
            s.Roles.Add(new IdentityUserRole()
            {
                RoleId = RoleManager.GetRoleId(RoleId.Supporter),
                UserId = s.Id
            });

            return s;
        }

        public static ApplicationUser CreateRandomPerson()
        {
            // We need to setup an actual user who can login
            var u = new ApplicationUser();
            u.Id = Guid.NewGuid().ToString();
            u.FirstName = GetRandom(FirstNames);
            u.LastName = GetRandom(LastNames);
            u.UserName = u.FirstName + u.LastName + GetRandom(100000);
            u.Email = u.UserName + "@cloudmedic.io";
            u.PhoneNumber = String.Format("({0}) {1}-{2}",
                GetRandom(999),
                GetRandom(999),
                GetRandom(9999));
            u.EmailConfirmed = true;
            u.PhoneNumberConfirmed = true;
            u.DateOfBirth = GetRandomDob();
            u.GenderEnum = (GenderEnum)GetRandom(1, 3);
            u.Specialty = string.Empty;
            u.SecurityStamp = Guid.NewGuid().ToString("D");
            return u;
        }

        public string GetRandomItem()
        {
            return GetRandom(_items);
        }

        public string GetRandomNames()
        {
            return GetRandom(FirstNames);
        }

        public static DateTime GetRandomDob()
        {
            return GetRandomTime(110);
        }

        public static DateTime GetRandomTime(int withinLastXYears)
        {            
            var randomMonths = GetRandom(withinLastXYears * 12);
            var dob = DateTime.UtcNow.AddMonths(-1 * randomMonths);
            var randomSeconds = GetRandom(30 * 24 * 60 * 60); // random between 0 and # of seconds in a month
            return dob.AddSeconds(-1 * randomSeconds);
        }

        public string GetRandomSSN()
        {
            return String.Format("{0:D3}-{1:D2}-{2:D4}", GetRandom(1000), GetRandom(100), GetRandom(10000));
        }

        public string GetRandomCC()
        {
            return String.Format("{0:D4}-{1:D4}-{2:D4}-{3:D4}", GetRandom(10000),
                GetRandom(10000),
                GetRandom(10000),
                GetRandom(10000));
        }
    }
}