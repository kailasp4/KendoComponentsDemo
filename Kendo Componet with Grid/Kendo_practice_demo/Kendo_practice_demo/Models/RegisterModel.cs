using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Kendo_practice_demo.Models
{
    public class RegisterModel
    {
        public int c_empid { get; set; }

        [Display(Name = "Name ")]
        [Required(ErrorMessage ="Name Must Be Required")]
        public string c_fname { get; set; }

        [Display(Name = "Gender ")]
        [Required(ErrorMessage = "Select Any One")]
        public string c_gender { get; set; }

        [Display(Name = "Email ")]
        [Required(ErrorMessage = "Email Must Be Required")]
        public string c_email { get; set; }

        [Display(Name = "Date")]
        [Required(ErrorMessage = "Date Must Be Required")]
        public string c_dob { get; set; }

        [Display(Name = "Hobby")]
       
        public Boolean c_hobby { get; set; }

        [Display(Name = "City")]
        [Required(ErrorMessage = "Select Any One")]
        public string c_city { get; set; }

        [Display(Name = "Department")]
        [Required(ErrorMessage = "Select Any One")]
        public string c_dept { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Name Must Be Required")]
        [DataType(DataType.Password)]
        public string c_pass { get; set; }
    }
}