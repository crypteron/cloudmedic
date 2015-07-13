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
    class DefaultControllerTest
    {
        [Test]
        public void TestGet()
        {
            var dc = new DefaultController();
            var res = dc.Get();
            Assert.IsTrue(res.IsSuccessStatusCode);
        }
    }
}
