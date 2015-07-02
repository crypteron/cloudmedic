using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Web;
using Crypteron.CipherCore.KeyManagement;
using Crypteron.CipherDb;

namespace CloudMedic.DAL
{
    public class Medication
    {
        public Guid MedicationId { get; set; }

        public string GenericName { get; set; }

        public string Code { get; set; }
    }
}