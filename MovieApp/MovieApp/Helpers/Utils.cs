using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Helpers
{
    public class Utils
    {

        public static bool IsStringValid(string value)
        {
            if (value == null || IsStringEmpty(value))
            {
                return false;
            }
            return true;
        }

        public static bool IsStringEmpty(string value)
        {
            if(value.Trim().Length == 0 || value.Equals(""))
            {
                return true;
            }
            return false;
        }

        public static bool IsURLValid(string URL)
        {
            return Uri.TryCreate(URL, UriKind.Absolute, out Uri uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }
    }
}
