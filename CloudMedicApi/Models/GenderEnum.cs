using CloudMedicApi.Utility;

namespace CloudMedicApi.Models
{
    public enum GenderEnum
    {
        [StringValue("unknown")]
        Unknown=0,

        [StringValue("male")]
        Male,
        
        [StringValue("female")]
        Female,
    }
}