using CloudMedicApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudMedicApi.Models.DTOs
{
    public class UsersPageDto
    {
        public List<UserDto> Users { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrev { get; set; }
        public int NumPages { get; set; }
        public int CurrentCount { get; set; }
    }
}