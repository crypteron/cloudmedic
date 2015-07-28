using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CloudMedicApi.Models
{
    // Models used as parameters to MedicationsController actions.

    public class CareTeamBindingModel
    {
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Staff Ids")]
        public List <string> ProviderIds { get; set; }

        [Required]
        [Display(Name = "Patient Id")]
        public string PatientId {get;set;}
    }
}