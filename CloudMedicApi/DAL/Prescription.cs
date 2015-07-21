using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudMedicApi.Models;

namespace CloudMedicApi.DAL
{
    public class Prescription
    {
        public Guid Id { get; set; }

        public Guid MedicationId { get; set; }

        public string Dosage { get; set; }

        public string Frequency { get; set; }

        public string Notes { get; set; }

        public virtual ApplicationUser Patient { get; set; }
    }
}