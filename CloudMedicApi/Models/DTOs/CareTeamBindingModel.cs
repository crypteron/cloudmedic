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
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Required]
        [Display(Name = "Staff")]
        public List <string> StaffId { get; set; }

        [Required]
        [Display(Name = "Patient")]
        public string Patient {get;set;}
    }
}