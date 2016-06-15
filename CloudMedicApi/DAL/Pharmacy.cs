using System;

namespace CloudMedicApi.DAL
{
    public class Pharmacy
    {
        public Guid PharmacyId { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }
    }
}