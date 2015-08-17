using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CloudMedicApi.Controllers
{
    [RoutePrefix("api/ping")]
    public class PingController : ApiController
    {
        // GET: api/Ping
        public string Get()
        {
            return "Ping successful. UTC time is " + DateTime.UtcNow.ToString("U");
        }
    }
}
