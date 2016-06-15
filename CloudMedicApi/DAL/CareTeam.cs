using System;
using System.Collections.Generic;
using CloudMedicApi.Models;

namespace CloudMedicApi.DAL
{
    public class CareTeam
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public virtual ICollection<ApplicationUser> Providers { get; set; }

       public virtual ICollection<ApplicationUser> Supporters { get; set; }

        public virtual ApplicationUser Patient { get; set; }
    }
}