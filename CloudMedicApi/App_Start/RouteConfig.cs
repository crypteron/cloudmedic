using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace CloudMedicApi
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //// The default controller when all else fails
            //routes.MapHttpRoute(
            //    name: "Default",
            //    routeTemplate: "{*id}",
            //    defaults: new
            //    {
            //        controller = "Default",
            //        action = "Get",
            //        id = RouteParameter.Optional
            //    });
        }
    }
}
