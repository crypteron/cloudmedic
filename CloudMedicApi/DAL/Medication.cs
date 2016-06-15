using System;
using System.Collections.Generic;

namespace CloudMedicApi.DAL
{
    public class Medication
    {
        public Guid MedicationId { get; set; }

        public string GenericName { get; set; }

        public string Code { get; set; }

        public virtual ICollection<Prescription> Prescriptions { get; set; }
    }
}