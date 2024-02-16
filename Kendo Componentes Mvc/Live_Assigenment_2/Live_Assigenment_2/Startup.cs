using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Live_Assigenment_2.Startup))]
namespace Live_Assigenment_2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
