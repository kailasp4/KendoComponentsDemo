using Live_Assigenment_2.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Live_Assigenment_2.Bal
{
    public class CategoryHelper : Helper
    {
        public List<CategoryModel> GetAllCategory()
        {
            List<CategoryModel> Categorylist = new List<CategoryModel>();
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * FROM t_categorytable";
            conn.Open();
            NpgsqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                var Category = new CategoryModel();

                Category.c_categoryid = Convert.ToInt32(sdr["c_categoryid"]);
                Category.c_categoryname = sdr["c_categoryname"].ToString();
                Categorylist.Add(Category);
            }
            conn.Close();
            sdr.Close();
            return Categorylist;
        }
    }
}