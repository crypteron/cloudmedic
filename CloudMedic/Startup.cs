using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CloudMedic.Startup))]
namespace CloudMedic
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
