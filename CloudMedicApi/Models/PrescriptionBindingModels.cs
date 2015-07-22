﻿using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace CloudMedicApi.Models
{
    // Models used as parameters to AccountController actions.

    public class PrescribeBindingModel
    {
        [Required]
        [Display(Name = "MedicationId")]
        public string MedicationId { get; set; }

        [Required]
        [Display(Name = "Frequency")]
        public string Frequency { get; set; }

        [Required]
        [Display(Name = "Dosage")]
        public string Dosage { get; set; }

        [Required]
        [Display(Name = "Notes")]
        public string Notes { get; set; }

        [Required]
        [Display(Name = "Patient Id")]
        public string PatientId { get; set; }
    }
}
