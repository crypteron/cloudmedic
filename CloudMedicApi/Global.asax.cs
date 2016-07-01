using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Optimization;
using System.Web.Routing;
using CloudMedicApi.DAL;
using CloudMedicApi.Utility;

namespace CloudMedicApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

            // 1. Log the exception object.
            Exception ex = Server.GetLastError();
            Logger.Log(ex);

            // 2. Send generic error response to client
            Response.Write(TextExceptionHandler.ErrorMessage);

            // 3. Done, clear the error from the server
            Server.ClearError();
        }
    }
}
