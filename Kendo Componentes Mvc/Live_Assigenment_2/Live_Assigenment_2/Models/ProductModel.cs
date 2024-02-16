using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Live_Assigenment_2.Models
{
    public class ProductModel
    {
        public int c_productid { get; set; }

        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Plaese Enter Your Product Name!!")]
        public string c_productname { get; set; }

        [Display(Name = "Product Price")]
        [Required(ErrorMessage = "Plaese Enter Your Product Price!!")]
        public int c_productprice { get; set; }


        [Display(Name = "ISActive")]
     
        public bool c_isactive { get; set; }


        [Display(Name = "Category Id")]
        public int c_categoryid { get; set; }


        [Display(Name  = "Category Name")]
        [Required(ErrorMessage = "Plaese Enter Your Category Name!!")]
        public string c_categoryname { get; set; }

        [Display(Name = "Date")]
        [DataType(DataType.Date)]
        public DateTime c_date { get; set; }
    }
}