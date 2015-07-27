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
        public Guid TeamId { get; set; }

        public string Name{ get; set; }

        public PatientDto Patient { get; set; }
        
        public List<UserDto> Staff { get; set; }

        public Boolean Active { get; set; }

    }
}