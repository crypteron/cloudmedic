using CloudMedicApi.Controllers;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;

namespace CloudMedic.Tests.Controllers
{
    [TestFixture]
    class UsersControllerTest
    {
        //[Test]
        public async Task GetUsersTest()
        {
            var pc = new UsersController();
            var result = await pc.GetUsers() as OkNegotiatedContentResult<List<UserDto>>;
            Assert.IsNotNull(result);
            Assert.IsTrue(result.Content.Count > 1);
        }
    }
}
