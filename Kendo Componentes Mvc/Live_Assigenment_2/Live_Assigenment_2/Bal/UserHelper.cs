using Live_Assigenment_2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;
using System.Text.RegularExpressions;
using System.Data;

namespace Live_Assigenment_2.Bal
{
    public class UserHelper : Helper
    {
        public void Register(UserModel user)
        {
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "INSERT INTO t_user(c_username,c_gender,c_email,c_password,c_city) VALUES (@c_username,@c_gender,@c_email,@c_password,@c_city);";
            cmd.Parameters.AddWithValue("@c_username", user.c_username);
            cmd.Parameters.AddWithValue("@c_gender", user.c_gender);
            cmd.Parameters.AddWithValue("@c_email", user.c_email);
            cmd.Parameters.AddWithValue("@c_password", user.c_password);
            cmd.Parameters.AddWithValue("@c_city", user.c_city);

            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();


        }

        public bool Login(Vm_Login User)
        {
            bool islogin = false;
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * FROM t_user WHERE c_email = @c_email AND c_password = @c_password";
            cmd.Parameters.AddWithValue("@c_email", User.c_email);
            cmd.Parameters.AddWithValue("c_password", User.c_password);
            conn.Open();
            NpgsqlDataReader sdr = cmd.ExecuteReader();
            if(sdr.Read())
            {
                HttpContext.Current.Session["Username"] = sdr["c_username"].ToString();
                HttpContext.Current.Session["Userid"] = sdr["c_userid"].ToString();
                islogin = true;
            }
            else
            {
                islogin = false;
            }
            conn.Close();
            sdr.Close();
            return islogin;
        }

        public UserModel UserProfile(int id)
        {
            List<UserModel> userprofile = new List<UserModel>();
            NpgsqlCommand cmd = new NpgsqlCommand();
            var product = new UserModel();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "SELECT * from t_user WHERE c_userid = @c_userid";
            cmd.Parameters.AddWithValue("c_productid", id);
            conn.Open();
            NpgsqlDataReader sdr = cmd.ExecuteReader();
            while (sdr.Read())
            {
                product.c_userid = Convert.ToInt32(sdr["c_userid"]);
                product.c_username = sdr["c_username"].ToString();
                product.c_gender = sdr["c_gender"].ToString();
                product.c_email = sdr["c_email"].ToString();
                product.c_password = sdr["c_password"].ToString();
                userprofile.Add(product);


            }
            conn.Close();
            sdr.Close();
            return product;
        }


        public bool EmailExists(string email)
        {
            bool isExists = false;
            NpgsqlCommand cmd = new NpgsqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = "SELECT * FROM t_user WHERE c_email = @c_email;";
            cmd.Parameters.AddWithValue("@c_email", email);
            conn.Open();
            NpgsqlDataReader dr = cmd.ExecuteReader();
            if (dr.Read())
            {
                isExists = true;
            }
            else
            {
                isExists = false;
            }
            dr.Close();
            conn.Close();
            return isExists;
        }

        public bool ValidatePassword(string password)
        {
            var passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$");
            return passwordRegex.IsMatch(password);
        }

    }
}