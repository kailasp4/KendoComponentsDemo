using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;


namespace Kendo_practice_demo.Models
{
    public class LoginModel
    {
        [Display(Name = "Email ")]
        [Required(ErrorMessage = "Email Must Be Required")]
        public  string c_email { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Name Must Be Required")]
        [DataType(DataType.Password)]
        public string c_pass { get; set; }
    }
}