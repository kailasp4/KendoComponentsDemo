using Live_Assigenment_2.Bal;
using Live_Assigenment_2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Live_Assigenment_2.Controllers
{
    public class UserController : Controller
    {
        UserHelper uh = new UserHelper();
        // GET: User
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(UserModel user)
        {
            uh.Register(user);
            return RedirectToAction("Login", "User");
        } 



        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Vm_Login user)
        {
            if(uh.Login(user))
            {
                return RedirectToAction("Index", "Product");
            }

            return RedirectToAction("Login", "User");
        }


        public bool EmailExists(string email)
        {
            return uh.EmailExists(email);
        }

        public bool ValidatePassword(string password)
        {
            return uh.ValidatePassword(password);
        }

    }
}