using Live_Assigenment_2.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Live_Assigenment_2.Bal
{
    public class ProductHelper : Helper
    {
        public List<ProductModel> GetAll()
        {
            List<ProductModel> Productlist = new List<ProductModel>();
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT p.c_productid,p.c_productname,p.c_productprice,p.c_date,p.c_isactive,p.c_categoryid,c.c_categoryname FROM t_producttable p join t_categorytable c on p.c_categoryid = c.c_categoryid";
            conn.Open();
            NpgsqlDataReader sdr = cmd.ExecuteReader();
            while(sdr.Read())
            {
                var product = new ProductModel();
                product.c_productid = Convert.ToInt32(sdr["c_productid"]);
                product.c_productname = sdr["c_productname"].ToString();
                product.c_productprice = Convert.ToInt32(sdr["c_productprice"]);
                product.c_isactive = Convert.ToBoolean(sdr["c_isactive"]);
                product.c_categoryid = Convert.ToInt32(sdr["c_categoryid"]);
                product.c_categoryname = sdr["c_categoryname"].ToString();
                product.c_date = Convert.ToDateTime(sdr["c_date"]);
                Productlist.Add(product);
            }
            conn.Close();
            sdr.Close();
            return Productlist;
        }

        public ProductModel GetOne(int id)
        {
            NpgsqlCommand cmd = new NpgsqlCommand();
                var product = new ProductModel();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT p.c_productid,p.c_productname,p.c_productprice,p.c_date,p.c_isactive,p.c_categoryid,c.c_categoryname FROM t_producttable p join t_categorytable c on p.c_categoryid = c.c_categoryid WHERE c_productid = @c_productid;";
            cmd.Parameters.AddWithValue("c_productid", id);
            conn.Open();
            NpgsqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                product.c_productid = Convert.ToInt32(sdr["c_productid"]);
                product.c_productname = sdr["c_productname"].ToString();
                product.c_productprice = Convert.ToInt32(sdr["c_productprice"]);
                product.c_isactive = Convert.ToBoolean(sdr["c_isactive"]);
                product.c_categoryid = Convert.ToInt32(sdr["c_categoryid"]);
                product.c_categoryname = sdr["c_categoryname"].ToString();
                product.c_date = Convert.ToDateTime(sdr["c_date"]);

            }
            conn.Close();
            sdr.Close();
            return product;
        }

        public void Add(ProductModel product)
        {
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "INSERT INTO t_producttable (c_productname,c_productprice,c_isactive,c_categoryid,c_date) VALUES (@c_productname,@c_productprice,@c_isactive,@c_categoryid,@c_date)";
            cmd.Parameters.AddWithValue("c_productname", product.c_productname);
            cmd.Parameters.AddWithValue("c_productprice", product.c_productprice);
            cmd.Parameters.AddWithValue("c_isactive", product.c_isactive);
            cmd.Parameters.AddWithValue("c_categoryid", product.c_categoryid);
            cmd.Parameters.AddWithValue("c_date", product.c_date);

            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();
        }


        public void Edit(ProductModel product)
        {
            NpgsqlCommand cmd = new NpgsqlCommand();
          
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "UPDATE t_producttable SET  c_productname = @c_productname, c_productprice = @c_productprice, c_isactive = @c_isactive, c_categoryid = @c_categoryid,c_date = @c_date WHERE c_productid = @c_productid ";
            cmd.Parameters.AddWithValue("c_productid", product.c_productid);
            cmd.Parameters.AddWithValue("c_productname", product.c_productname);
            cmd.Parameters.AddWithValue("c_productprice", product.c_productprice);
            cmd.Parameters.AddWithValue("c_isactive", product.c_isactive);
            cmd.Parameters.AddWithValue("c_categoryid", product.c_categoryid);
            cmd.Parameters.AddWithValue("c_date", product.c_date);
            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();
        }

        public void Delete(ProductModel product)
        {
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "DELETE FROM t_producttable WHERE c_productid = @c_productid";
            cmd.Parameters.AddWithValue("@c_productid", product.c_productid);
            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();
        }

    }
}