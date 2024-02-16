using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace Live_Assigenment_2.Models
{
    public class Vm_Login
    {
        [Display(Name = "User Email")]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage = "Please enter a valid e-mail adress")]
        public string c_email { get; set; }

        [Display(Name = "User Password")]
        [DataType(DataType.Password)]
        //[RegularExpression(@"^ (?=.*[A - Za - z])(?=.*\d)(?=.*[@$!% *#?&])[A-Za-z\d@$!%*#?&]{8,}$")]
        public string c_password { get; set; }
    }
}