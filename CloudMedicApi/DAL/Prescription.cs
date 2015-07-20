using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudMedicApi.Models;

namespace CloudMedicApi.DAL
{
    public class Prescription
    {
        public Guid PrescriptionID { get; set; }

        public Guid MedicationID { get; set; }

        public string Frequency { get; set; }

        public string Dosage { get; set; }

        public string Notes { get; set; } 


    }
}