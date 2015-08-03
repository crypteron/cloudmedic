using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CloudMedicApi.Models
{
    // Models used as parameters to MedicationsController actions.

    public class MedicationBindingModel
    {
        [Required]
        [Display(Name = "Generic Name")]
        public string GenericName { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
    }
}
