using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace CloudMedicApi.Controllers
{
    /// <summary>
    /// This controller kicks in from WebApiConfig to handle the default route
    /// </summary>
    public class DefaultController : ApiController
    {
        #region [Api default]

        #region [welcomeScreen ASCII art]
        // consts for performance
        private const string NewLine = "\n";
        private const string WelcomeMsg =
@"Welcome to the CloudMedic API server " + NewLine +
@"------------------------------------" + NewLine +
@"" + NewLine +
@"    The cloud medic server supports mobile and web user clients for machine to machine communication" + NewLine +
@"" + NewLine +
@"----------------------------------------------------------" + NewLine +
@"Current time (UTC) : {0}" + NewLine;
        #endregion

    [HttpGet]
        public HttpResponseMessage Get()
        {
            var strResp = String.Format(WelcomeMsg, DateTime.UtcNow.ToString("F"));                

            var httpResp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(strResp, Encoding.UTF8, "text/plain")
            };
            return httpResp;
        }
        #endregion
    }
}
