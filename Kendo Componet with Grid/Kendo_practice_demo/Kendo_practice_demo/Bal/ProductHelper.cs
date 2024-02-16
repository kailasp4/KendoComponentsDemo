using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;
using Kendo_practice_demo.Models;

namespace Kendo_practice_demo.Bal
{
    public class ProductHelper : Helper
    {
        public List<ProductModel> GetAll()
        {
            List<ProductModel> disp = new List<ProductModel>();
            con.Open();
            NpgsqlCommand cm = new NpgsqlCommand();
            cm.Connection = con;
            cm.CommandType = System.Data.CommandType.Text;
            cm.CommandText = "select *  from product";
            NpgsqlDataReader sdr = cm.ExecuteReader();
            while (sdr.Read())
            {
                var stlist = new ProductModel();
                stlist.pid = Convert.ToInt32(sdr["pid"]);
                stlist.pname = sdr["pname"].ToString();
                stlist.price = Convert.ToInt32(sdr["price"]);

                disp.Add(stlist);
            }
            sdr.Close();
            con.Close();
            return disp;
        }


        public ProductModel GetOne(int id)
        {
            
            con.Open();
            NpgsqlCommand cm = new NpgsqlCommand();
            cm.Connection = con;
            cm.CommandType = System.Data.CommandType.Text;
            cm.CommandText = "select *  from product where pid="+id;
            NpgsqlDataReader sdr = cm.ExecuteReader();
            var stlist = new ProductModel();
            if (sdr.Read())
            {
                stlist.pid = Convert.ToInt32(sdr["pid"]);
                stlist.pname = sdr["pname"].ToString();
                stlist.price = Convert.ToInt32(sdr["price"]);

                
            }
            sdr.Close();
            con.Close();
            return stlist;
        }

        public bool Insert(ProductModel data)
        {
            bool check = false;
            NpgsqlCommand cm = new NpgsqlCommand("Insert into product(pname,price) VALUES(@pname,@price)", con);
            cm.Parameters.AddWithValue("@pname", data.pname);
            cm.Parameters.AddWithValue("@price", data.price);
            con.Open();
           int i =  cm.ExecuteNonQuery();
            if(i > 0)
            {
                check = true;
            }
            else
            {
                check = false;
            }
            con.Close();
            return check;
        }
        public bool Update(ProductModel data)
        {
            bool check = false;
            NpgsqlCommand cm = new NpgsqlCommand("Update product set pname=@pname,price=@price where pid=@pid", con);
            cm.Parameters.AddWithValue("@pid", data.pid);
            cm.Parameters.AddWithValue("@pname", data.pname);
            cm.Parameters.AddWithValue("@price", data.price);
            con.Open();
            int i = cm.ExecuteNonQuery();
            if (i > 0)
            {
                check = true;
            }
            else
            {
                check = false;
            }
            con.Close();
            return check;
        }
        public bool Delete(ProductModel data)
        {
            bool check = false;
            NpgsqlCommand cm = new NpgsqlCommand("Delete From product where pid=@pid", con);
            cm.Parameters.AddWithValue("@pid", data.pid);
            con.Open();
            int i = cm.ExecuteNonQuery();
            if (i > 0)
            {
                check = true;
            }
            else
            {
                check = false;
            }
            con.Close();
            return check;
        }
    }
}