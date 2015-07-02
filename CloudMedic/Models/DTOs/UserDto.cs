﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CloudMedic.Controllers.Api
{
    /// <summary>
    /// This is our DTO from the front end
    /// </summary>
    public class UserDto
    {
        public string UserName { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public List<string> Roles { get; set; }
    }
}
