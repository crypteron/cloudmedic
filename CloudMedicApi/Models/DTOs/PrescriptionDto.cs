using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CloudMedicApi.Controllers
{
    /// <summary>
    /// This is our DTO from the front end
    /// </summary>
    public class PrescriptionDto
    {
        public Guid PrescriptionId { get; set; }

        //public Guid MedicationId { get; set; }
        public string MedicationName { get; set; }

        public string MedicationCode { get; set; }

        public string PatientName { get; set; }

        //public string PatientId { get; set; }

        public string Dosage { get; set; }

        public string Frequency { get; set; }

        public string Notes { get; set; }
    }
}
