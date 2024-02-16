using Live_Assigenment_2.Bal;
using Live_Assigenment_2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Live_Assigenment_2.Controllers
{
    public class UserAuthController : Controller
    {
        // GET: UserAuth
        UserHelper uh = new UserHelper();

        public ActionResult UserProfile()
        {
            if (Session["userid"] == null)
            {
                return RedirectToAction("Login", "User");
            }
            UserModel user = uh.UserProfile(Convert.ToInt32(Session["userid"]));
            return View(user);

        }
    }
}