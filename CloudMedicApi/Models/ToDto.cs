using CloudMedicApi.Controllers;
using CloudMedicApi.DAL;
using Crypteron.CipherCore.ValueInjecter;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudMedicApi.Models
{
    public class ToDto
    {

        public static UserDto UserToDto(ApplicationUser user, Dictionary<string, IdentityRole> roles = null)
        {
            var userDto = new UserDto();
            userDto.InjectFrom(user);
            userDto.Roles = new List<string>();
            if (roles != null)
            {
                foreach (var role in user.Roles)
                {
                    userDto.Roles.Add(roles[role.RoleId].Name);
                }
            }
            userDto.UserId = user.Id;
            userDto.Prescriptions = new List<string>();
            if (user.Prescriptions != null)
            {
                foreach (var prescription in user.Prescriptions)
                {
                    userDto.Prescriptions.Add(prescription.PrescriptionId.ToString());
                }
            }
            return userDto;
        }

        public static CareTeamDto CareTeamToDto(CareTeam careTeam, Dictionary<string, IdentityRole> roles = null)
        {
            var careTeamDto = new CareTeamDto();
            careTeamDto.InjectFrom(careTeam);
            //careTeamDto.PatientId = careTeam.Patient.Id;
            careTeamDto.Patient = UserToDto(careTeam.Patient, roles);
            //careTeamDto.ProviderIds = new List<string>();
            careTeamDto.Providers = new List<UserDto>();
            foreach (var provider in careTeam.Providers)
            {
                //careTeamDto.ProviderIds.Add(provider.Id);
                careTeamDto.Providers.Add(UserToDto(provider, roles));

            }
            return careTeamDto;
        }

        public static PrescriptionDto PrescriptionToDto(Prescription prescription)
        {
            var prescriptionDto = new PrescriptionDto();
            prescriptionDto.InjectFrom(prescription);
            prescriptionDto.MedicationName = prescription.Medication.GenericName;
            prescriptionDto.MedicationCode = prescription.Medication.Code;
            prescriptionDto.PatientName = prescription.Patient.FirstName + " " + prescription.Patient.LastName;
            return prescriptionDto;
        }

        public static MedicationDto MedicationToDto(Medication medication)
        {
            var medicationDto = new MedicationDto();
            medicationDto.InjectFrom(medication);
            return medicationDto;
        }

    }
}