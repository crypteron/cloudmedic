namespace CloudMedicApi.BLL
{
    public enum RoleId
    {
        // Consumers of the system
        Patient=0,
        Physician,
        Nurse,

        // Managers
        SysManager,

        // System Root Administrators
        SysAdmin
    }
}