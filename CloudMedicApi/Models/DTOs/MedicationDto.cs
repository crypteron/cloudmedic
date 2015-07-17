using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CloudMedicApi.Controllers
{
    /// <summary>
    /// This is our DTO from the front end
    /// </summary>
    public class MedicationDto
    {
        public Guid MedicationId { get; set; }

        public string GenericName { get; set; }

        public string Code { get; set; }
    }
}
