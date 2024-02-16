using Kendo_practice_demo.Bal;
using Kendo_practice_demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo_practice_demo.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        ProductHelper ph = new ProductHelper();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            return Json(ph.GetAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOne(int id)
        {
            return Json(ph.GetOne(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insert(ProductModel data)
        {
            
            return Json(ph.Insert(data),JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ProductModel data)
        {
            return Json(ph.Update(data), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(ProductModel data)
        {
            return Json(ph.Delete(data), JsonRequestBehavior.AllowGet);
        }
    }
}