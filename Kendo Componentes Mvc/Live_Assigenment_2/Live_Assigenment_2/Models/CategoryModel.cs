using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Live_Assigenment_2.Models
{
    public class CategoryModel
    {
        [Display(Name = "Category Id")]
        public int c_categoryid { get; set; }


        [Display(Name = "Category Name")]
        [Required(ErrorMessage = "Plaese Enter Your Category Name!!")]
        public string c_categoryname { get; set; }
    }
}