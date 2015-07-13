using CloudMedicApi.Controllers;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudMedic.Tests.Controllers
{
    [TestFixture]
    class UsersControllerTest
    {
        [Test]
        public void GetUsersTest()
        {
            var pc = new UsersController();
        }
    }
}
