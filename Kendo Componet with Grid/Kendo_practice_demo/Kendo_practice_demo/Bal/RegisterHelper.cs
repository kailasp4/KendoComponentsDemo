using Kendo_practice_demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;

namespace Kendo_practice_demo.Bal
{
    public class RegisterHelper:Helper
    {
        public void Register(RegisterModel data)
        {
            NpgsqlCommand cm = new NpgsqlCommand("Insert into fregister(c_fname,c_gender,c_email,c_dob,c_hobby,c_city,c_dept,c_pass) VALUES(@c_fname,@c_gender,@c_email,@c_dob,@c_hobby,@c_city,@c_dept,@c_pass)", con);
            cm.Parameters.AddWithValue("@c_fname", data.c_fname);
            cm.Parameters.AddWithValue("@c_gender", data.c_gender);
            cm.Parameters.AddWithValue("@c_email", data.c_email);
            cm.Parameters.AddWithValue("@c_dob", data.c_dob);
            cm.Parameters.AddWithValue("@c_hobby", data.c_hobby);
            cm.Parameters.AddWithValue("@c_city", data.c_city);
            cm.Parameters.AddWithValue("@c_dept", data.c_dept);
            cm.Parameters.AddWithValue("@c_pass", data.c_pass);
            con.Open();
            cm.ExecuteNonQuery();
            con.Close();
        }

        public bool Login(LoginModel data)
        {
            bool isCheck = false;
            NpgsqlCommand cm = new NpgsqlCommand("select * from fregister where c_email=@c_email AND c_pass=@c_pass", con);
            cm.Parameters.AddWithValue("@c_pass", data.c_pass);
            cm.Parameters.AddWithValue("@c_email", data.c_email);
            con.Open();
            NpgsqlDataReader dr = cm.ExecuteReader();
            if (dr.Read())
            {
                isCheck = true;
            }
            else
            {
                isCheck = false;
            }
            con.Close();
            return isCheck;
        }

        public List<CityModel> GetCity()
        {
            List<CityModel> displayCity = new List<CityModel>();
            con.Open();
            NpgsqlCommand cm = new NpgsqlCommand();
            cm.Connection = con;
            cm.CommandType = System.Data.CommandType.Text;
            cm.CommandText = "select *  from city";
            NpgsqlDataReader sdr = cm.ExecuteReader();
            while (sdr.Read())
            {
                var stlist = new CityModel();
                stlist.cityid = Convert.ToInt32(sdr["cityid"]);
                stlist.cityname = sdr["cityname"].ToString();

                displayCity.Add(stlist);
            }
            sdr.Close();
            con.Close();
            return displayCity;
        }
    }
}