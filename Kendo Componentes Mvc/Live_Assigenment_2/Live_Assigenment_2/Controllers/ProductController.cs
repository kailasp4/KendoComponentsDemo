using Live_Assigenment_2.Bal;
using Live_Assigenment_2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Live_Assigenment_2.Controllers
{
    public class ProductController : Controller
    {
        ProductHelper ph = new ProductHelper();
        CategoryHelper ch = new CategoryHelper();
        // GET: Product
        public ActionResult Index()
        {
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            List<ProductModel> Productlist = ph.GetAll();
            return View(Productlist);
        }

        public ActionResult Details(int id)
        {
            ProductModel product = null;
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            product = ph.GetOne(id);
            return View(product);
        }
        public ActionResult Add()
        {
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            ViewBag.category = ch.GetAllCategory();
            return View();

        }

        [HttpPost]
        public ActionResult Add(ProductModel product)
        {
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            ph.Add(product);
         
            return RedirectToAction("Index", "Product");

        }

        public ActionResult Edit(int id)
        {
            ProductModel product = null;
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            ViewBag.Category = ch.GetAllCategory();
            product = ph.GetOne(id);
            return View(product);

        }

        [HttpPost]
        public ActionResult Edit(ProductModel product)
        {
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            ph.Edit(product);
            return RedirectToAction("Index", "Product");

        }

        public ActionResult Delete(int id)
        {
            ProductModel product = null;
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            product = ph.GetOne(id);
            return View(product);

        }
        [HttpPost]
        public ActionResult Delete(ProductModel product)
        {
            if (Session["username"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            ph.Delete(product);
            return RedirectToAction("Index", "Product");

        }
      
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login", "User");
        }

        public JsonResult GetCategory()
        {
            return Json(ch.GetAllCategory(), JsonRequestBehavior.AllowGet);
        }

    }
}