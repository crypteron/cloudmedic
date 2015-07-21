using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using CloudMedicApi.DAL;
using CloudMedicApi.Utility;
using Crypteron.CipherDb;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace CloudMedicApi.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        #region [CloudMedic app specific properties ]
        [Secure]
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Secure]
        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Secure]
        [Required]
        [Display(Name = "Gender")]
        public string Gender { get; set; }

        [Secure]
        [Required]
        [Display(Name = "Date of birth")]
        public string DOB { get; set; }

        [Secure]
        [Display(Name = "Specialty")]
        public string Specialty { get; set; }

        [NotMapped]
        [Display(Name = "Date of birth")]
        [Required]
        public DateTime DateOfBirth
        {
            get
            {
                DateTime dob;
                return DateTime.TryParse(DOB, out dob) ? dob : default(DateTime);
            }
            set
            {
                DOB = value.ToString("O");
            }
        }

        [NotMapped]
        [Required]
        [Display(Name = "Gender")]
        public GenderEnum GenderEnum
        {
            get
            {
                if (Gender == null)
                    return GenderEnum.Unknown;

                return (GenderEnum)Enum.Parse(typeof(GenderEnum), Gender, true);
            }
            set
            {
                Gender = StringEnum.GetStringValue(value);
            }
        }

        //[Secure]
        //public override string Email { get; set; }

        //[Secure]
        //public override string UserName { get; set; }

        //[Secure]
        //public override string PhoneNumber { get; set; }

        public virtual ICollection<Prescription> Prescriptions { get; set; }

        public virtual ICollection<MedicationAdministered> MedicationAdministered { get; set; }
        #endregion

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}