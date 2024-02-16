using Kendo_practice_demo.Bal;
using Kendo_practice_demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo_practice_demo.Controllers
{
    public class UserController : Controller
    {
        RegisterHelper uh = new RegisterHelper();

        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(RegisterModel data)
        {
            uh.Register(data);
            return RedirectToAction("Login");
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(LoginModel data)
        {
            bool check = uh.Login(data);
            if (check)
            {
                return RedirectToAction("Index","Product");

            }
            else
            {
                return RedirectToAction("Register");
            }
        }

        public JsonResult GetCity()
        {
            return Json(uh.GetCity(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDepartMent()
        {
            List<string> dept = new List<string>()
            {
                "IT","Civil","Mech","Computer"
            };
            ViewBag.dept = dept;
            return Json(ViewBag.dept, JsonRequestBehavior.AllowGet);  
        }
    }
}