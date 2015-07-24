using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CloudMedicApi.Models;

namespace CloudMedicApi.DAL
{
    public class Prescription
    {
        public Guid PrescriptionId { get; set; }

        public string Dosage { get; set; }

        public string Frequency { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string Notes { get; set; }

        public DateTime DateofStart
        {
            get
            {
                DateTime dos;
                return DateTime.TryParse(StartDate, out dos) ? dos : default(DateTime);
            }
            set
            {
                StartDate = value.ToString("O");
            }
        }

        public DateTime DateofEnd
        {
            get
            {
                DateTime doe;
                return DateTime.TryParse(EndDate, out doe) ? doe : default(DateTime);
            }
            set
            {
                EndDate = value.ToString("O");
            }
        }

        public virtual Medication Medication { get; set; }

        public virtual ApplicationUser Patient { get; set; }
    }
}