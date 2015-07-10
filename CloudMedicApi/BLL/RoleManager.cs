using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using CloudMedicApi.Models;
using System.Text;

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