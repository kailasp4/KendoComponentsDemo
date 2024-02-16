using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Live_Assigenment_2.Bal
{
    public class Helper
    {
        public NpgsqlConnection conn = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["Myconnection"].ConnectionString);
    }
}