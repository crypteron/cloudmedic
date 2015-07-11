using System;
using System.Collections.Generic;
using CloudMedic.Models;

namespace CloudMedic.DAL
{
    /// <summary>
    /// This class or table will capture all medication events
    /// for a given patient.
    /// 
    /// Based on http://gunston.gmu.edu/healthscience/709/DataWarehouses.asp
    /// </summary>
    public class MedicationAdministered
    {
        public Guid Id { get; set; }

        public DateTime TreatmentDate { get; set; }

        public virtual Pharmacy Pharmacy { get; set; }

        public virtual ICollection<Medication> Medications { get; set; }
        
        public virtual ICollection<ApplicationUser> CareTeam { get; set; }

        public virtual ApplicationUser Patient { get; set; }
    }
}