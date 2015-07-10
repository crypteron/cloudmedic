using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudMedicApi.Utility
{
    public static class StringEnum
    {
        public static string GetStringValue(Enum value)
        {
            string output = null;
            var type = value.GetType();

            var fi = type.GetField(value.ToString());
            var attrs = fi.GetCustomAttributes(typeof(StringValue), false) as StringValue[];

            if (attrs != null && attrs.Length > 0)
                output = attrs[0].Value;

            return output;
        }
    }

    public class StringValue : Attribute
    {
        private readonly string _value;

        public StringValue(string value)
        {
            _value = value;
        }

        public string Value
        {
            get { return _value; }
        }
    }
}