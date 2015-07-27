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
        public Guid TeamId { get; set; }

        public string Name { get; set; }

        public virtual ICollection<ApplicationUser> Staff { get; set; }

        public virtual ApplicationUser Patient { get; set; }

        public Boolean Active { get; set; }
    }
}