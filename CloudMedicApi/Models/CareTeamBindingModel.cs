using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CloudMedicApi.Models
{
    // Models used as parameters to CareTeamsController actions.

    public class CareTeamBindingModel
    {
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Staff Ids")]
        public List<string> ProviderIds { get; set; }

        [Required]
        [Display(Name = "Supporter Ids")]
        public List<string> SupporterIds { get; set; }

        [Required]
        [Display(Name = "Patient Id")]
        public string PatientId { get; set; }
    }

    public class ActivateTeamBindingModel
    {
        [Required]
        [Display(Name = "Id")]
        public Guid Id { get; set; }
    }

    public class UpdateTeamBindingModel
    {
        [Required]
        [Display(Name = "Team Id")]
        public Guid TeamId { get; set; }

        [Required]
        [Display(Name = "Provider Ids")]
        public List<string> ProviderIds { get; set; }

        [Required]
        [Display(Name = "Supporter Ids")]
        public List<string> SupporterIds { get; set; }

        [Required]
        [Display(Name = "Team Name")]
        public string TeamName { get; set; }
    }
}