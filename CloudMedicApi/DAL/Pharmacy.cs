using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Web;
using Crypteron.CipherCore.KeyManagement;
using Crypteron.CipherDb;

namespace CloudMedicApi.DAL
{
    public class Pharmacy
    {
        public Guid PharmacyId { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }
    }
}