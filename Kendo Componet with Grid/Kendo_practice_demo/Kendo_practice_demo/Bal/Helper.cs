using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;

namespace Kendo_practice_demo.Bal
{
    public class Helper
    {
       public NpgsqlConnection con = new NpgsqlConnection("Server=cipg01;Port=5432;Database=intern_005;User Id=postgres; Password=123456;");
    }
}