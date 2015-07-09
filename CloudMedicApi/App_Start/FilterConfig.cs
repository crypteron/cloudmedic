using System.Web;
using System.Web.Mvc;

namespace CloudMedicApi
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            filters.Add(new RequireHttpsAttribute());
        }
    }
}
