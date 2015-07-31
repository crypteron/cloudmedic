using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Web;
using Crypteron.CipherCore.KeyManagement;
using Crypteron.CipherDb;
using CloudMedicApi.Models;

namespace CloudMedicApi.DAL
{
    public class CareTeam
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public virtual ICollection<ApplicationUser> Providers { get; set; }

        //public virtual ICollection<ApplicationUser> Supporters { get; set; }

        public virtual ApplicationUser Patient { get; set; }
    }
}