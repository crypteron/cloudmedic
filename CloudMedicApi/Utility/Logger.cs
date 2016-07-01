using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace CloudMedicApi.Utility
{
    /// <summary>
    /// This is a generalized exception/error handler that can be plugged into
    /// the WebApi exception handling (via `ExceptionLogger`) as well as can be 
    /// invoked directly by app code (via `Log(..)` overloads)
    /// </summary>
    public class Logger : ExceptionLogger
    {
        private static readonly NLog.Logger logger = LogManager.GetCurrentClassLogger();

        public override void Log(ExceptionLoggerContext context)
        {
#if DEBUG
            Debug.WriteLine("Logging");
#endif
            logger.Log(LogLevel.Trace, context.Exception);
        }

        private static string RequestToString(HttpRequestMessage request)
        {
            var message = new StringBuilder();
            if (request.Method != null)
                message.Append(request.Method);

            if (request.RequestUri != null)
                message.Append(" ").Append(request.RequestUri);

            return message.ToString();
        }

        public static void Log(string msg)
        {
            logger.Trace(msg);
        }

        public static void Log(Exception e)
        {
            Log(e.ToString());
        }
    }
}