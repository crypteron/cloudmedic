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
            // Init code-first database, switch in production!
#if DEBUG 
            Database.SetInitializer(new CloudMedicDbInitializer()); // Development
#else
            Database.SetInitializer<MyDbContext>(null); // Production
#endif
            //AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs
            // Get the exception object.
            Exception exc = Server.GetLastError();
            Response.Write(TextExceptionHandler.ErrorMessage);

            // Clear the error from the server
            Server.ClearError();
        }
    }
}
