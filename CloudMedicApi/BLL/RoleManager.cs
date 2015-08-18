using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace CloudMedicApi.BLL
{
    public class RoleManager
    {
        public static string GetRoleName(RoleId roleId)
        {
            return Enum.GetName(typeof(RoleId), roleId);
        }

        public static string GetRoleName(string roleIdStr)
        {
            var roleId = (RoleId)Enum.Parse(typeof(RoleId), roleIdStr, true);
            return Enum.GetName(typeof(RoleId), roleId);
        }

        public static string GetRoleId(RoleId roleid)
        {
            var roleAsInt = (int) roleid;
            var roleIdStr = roleAsInt.ToString("D");
            return roleIdStr;
        }

        public static string GetRoleId(string roleIdStr)
        {
            var roleId = (RoleId) Enum.Parse(typeof (RoleId), roleIdStr, true);
            return GetRoleId(roleId);
        }

        public static bool IsRole(IdentityUserRole userRole, RoleId roleId)
        {
            if (userRole.RoleId == null)
                return false;

            var currRole = (RoleId) Enum.Parse(typeof(RoleId), userRole.RoleId);

            if (currRole == roleId)
                return true;

            return true;
        }

        //public static string GetAllRolesString(ApplicationUser appUser)
        //{
        //    var RoleNameList = new List<string>();
        //    foreach (IdentityUserRole role in appUser.Roles)
        //    {
        //        RoleNameList.Add(RoleManager.GetRoleName(role.RoleId));
        //    }
        //    return string.Join(", ", RoleNameList);

        //}
    }
}