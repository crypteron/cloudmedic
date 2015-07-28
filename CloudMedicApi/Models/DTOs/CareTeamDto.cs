using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CloudMedicApi.Controllers
{
    /// <summary>
    /// This is our DTO from the front end
    /// </summary>
    public class CareTeamDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public UserDto Patient { get; set; }
        //public string PatientId { get; set; }

        public List<UserDto> Providers { get; set; }
        //public List<string> ProviderIds { get; set; }
    }
}