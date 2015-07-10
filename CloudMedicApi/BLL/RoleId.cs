namespace CloudMedicApi.BLL
{
    public enum RoleId
    {
        // Consumers of the system
        Patient = 0,
        Physician = 1,
        Nurse = 2,

        // Managers
        SysManager = 3,

        // System Root Administrators
        SysAdmin = 4
    }
}