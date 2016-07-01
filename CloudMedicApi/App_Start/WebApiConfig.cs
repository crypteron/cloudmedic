using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.ExceptionHandling;
using CloudMedicApi.Utility;

namespace CloudMedicApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Configure default exception handling
            config.Services.Replace(typeof(IExceptionHandler), new TextExceptionHandler());
            config.Services.Add(typeof(IExceptionLogger), new Logger());

            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            // The default controller when all else fails
            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "api/{controller}/{*id}",
                defaults: new
                {
                    controller = "Default",
                    action = "Get",
                    id = RouteParameter.Optional
                });

            // Enforce HTTPS
            config.Filters.Add(new Filters.RequireHttpsAttribute());
        }
    }
}
