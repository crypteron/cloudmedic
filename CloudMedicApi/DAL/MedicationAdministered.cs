using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using CloudMedicApi.Models;

namespace CloudMedicApi.DAL
{
    // Based on http://gunston.gmu.edu/healthscience/709/DataWarehouses.asp
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