using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Diagnostics;

namespace CloudMedicApi.Utility
{
    public class TextExceptionHandler : ExceptionHandler
    {
        public const string ErrorMessage = "Something went wrong. Please report this on the github project so we can try to fix it.";

        public override void Handle(ExceptionHandlerContext context)
        {
            Debug.WriteLine("Handling");
            context.Result = new TextPlainErrorResult
            {
                Request = context.ExceptionContext.Request,
                Content = ErrorMessage
            };
        }

        private class TextPlainErrorResult : IHttpActionResult
        {
            public HttpRequestMessage Request { get; set; }

            public string Content { get; set; }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                HttpResponseMessage response = 
                                 new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(Content);
                response.RequestMessage = Request;
                return Task.FromResult(response);
            }
        }
    }
}