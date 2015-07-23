using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CloudMedicApi.Controllers
{
    /// <summary>
    /// This is our DTO from the front end
    /// </summary>
    public class PatientDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set;}
    }
}
