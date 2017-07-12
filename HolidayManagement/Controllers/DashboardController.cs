using HolidayManagement.Models;
using HolidayManagement.Repository;
using System.Web.Mvc;

namespace HolidayManagement.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public UserDetailsRepository db = new UserDetailsRepository();
        public TeamRepository tdb = new TeamRepository();
        public ActionResult Index()
        {
            DashboardViewModel vM = new DashboardViewModel()
            {
                Test = "mukodik",
                userL = db.GetUsers(),
                teamL = tdb.GetTeams()
            };

            return View(vM);
        }
        

    }
}