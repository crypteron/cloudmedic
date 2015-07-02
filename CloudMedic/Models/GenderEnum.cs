using CloudMedic.Utility;

namespace CloudMedic.Models
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