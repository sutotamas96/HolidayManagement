using HolidayManagement.Models;
using HolidayManagement.Repository;
using System;
using System.Web.Mvc;
using System.Linq;
using System.Web.Security;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;


//create a new controller for dashboard model
namespace HolidayManagement.Controllers
{
    [Authorize] // - accessible only for logged in users
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public UserDetailsRepository db = new UserDetailsRepository();
        public TeamRepository tdb = new TeamRepository();
        BankHolidayRepository BhR = new BankHolidayRepository();
        HolidayManagementContext newdb = new HolidayManagementContext();
        VacationRepository Vacations = new VacationRepository();       

        public CalendarModel generateCalendar(YearMonthModel ymmodel)//, string userID)
        {
            //create a new calendar model
            CalendarModel newCalendar = new CalendarModel();

            //get bankholidays, vacations and populate calendar
            var bankholidays = BhR.GetBankHolidays();
            var vacations = Vacations.GetVacations();
            newCalendar.monthdays = new System.Collections.Generic.List<DayModel>();
            newCalendar.bankholidays = bankholidays;
            newCalendar.vacations = vacations;
            
            //get our month days number and parse it
            var mdays = DateTime.DaysInMonth(ymmodel.year, ymmodel.month);
            for ( var iter = 1; iter <= mdays; iter++)
            {
                //default values for descriptions and freeday
                var descriptionStatus = "busy";
                var isFreeDayStatus = false;

                //next day and check if its weekend, bankholiday or vacation day
                var currentDate = new DateTime(ymmodel.year, ymmodel.month, iter);
                if ((currentDate.DayOfWeek == DayOfWeek.Saturday) || (currentDate.DayOfWeek == DayOfWeek.Sunday))
                {
                    descriptionStatus = "Weekend";
                    isFreeDayStatus = true;
                }
                if (bankholidays.Any(x => x.Month == currentDate.Month && x.Day == iter))
                {
                    isFreeDayStatus = true;
                    descriptionStatus += " BankHoliday";
                }
                var CurrentUserID = User.Identity.GetUserId();
                var check = newdb.UserDetails.FirstOrDefault(d => d.UserID == CurrentUserID);
                if (vacations.Any(x => x.UserId == check.ID && x.StartDate <= currentDate && x.EndDate >= currentDate && x.StateId == 1))
                {
                    descriptionStatus += " Want to go to Vacation";
                }
                if (vacations.Any(x => x.UserId == check.ID && x.StartDate <= currentDate && x.EndDate >= currentDate && x.StateId == 2))
                {                
                    isFreeDayStatus = true;
                    descriptionStatus += " Vacation";
                }

                


                //add it to our list
                newCalendar.monthdays.Add(new DayModel {    description = descriptionStatus,
                                                            day = iter,
                                                            name = currentDate.ToString("dddd"),
                                                            isFreeDay = isFreeDayStatus
                                                             });

            }

            //return our calendar
            return newCalendar;
        } 

        public ActionResult Index()
           {

            YearMonthModel temp = new YearMonthModel { month = DateTime.Now.Month, year = DateTime.Now.Year};
            DashboardViewModel vM = new DashboardViewModel()
            {
                userID = User.Identity.GetUserId(),
                userL = db.GetUsers(), //Get the user’s list and pass it to the Model
                teamL = tdb.GetTeams(),  //Get the team’s list and pass it to the Model
                roleL = newdb.Roles.ToList(),
                calendar = generateCalendar(temp)

            };
            return View(vM);
        }

        public ActionResult generateCalendarJ(YearMonthModel ymmodel, string userID)//, )
        {
            //create a new calendar model
            CalendarModel newCalendar = new CalendarModel();

            //get bankholidays, vacations and populate calendar
            var bankholidays = BhR.GetBankHolidays();
            var vacations = Vacations.GetVacations();
            newCalendar.monthdays = new System.Collections.Generic.List<DayModel>();
            newCalendar.bankholidays = bankholidays;
            newCalendar.vacations = vacations;

            //get our month days number and parse it
            var mdays = DateTime.DaysInMonth(ymmodel.year, ymmodel.month);
            for (var iter = 1; iter <= mdays; iter++)
            {
                //default values for descriptions and freeday
                var descriptionStatus = "";
                var isFreeDayStatus = false;

                //next day and check if its weekend, bankholiday or vacation day
                var currentDate = new DateTime(ymmodel.year, ymmodel.month, iter);
                if ((currentDate.DayOfWeek == DayOfWeek.Saturday) || (currentDate.DayOfWeek == DayOfWeek.Sunday))
                {
                    descriptionStatus = "Weekend";
                    isFreeDayStatus = true;
                }
                if (bankholidays.Any(x => x.Month == currentDate.Month && x.Day == iter))
                {
                    isFreeDayStatus = true;
                    descriptionStatus += " BankHoliday";
                }

                var check = newdb.UserDetails.FirstOrDefault(d => d.UserID == userID);
                if (check != null)
                {
                    if (vacations.Any(x => x.UserId == check.ID && x.StartDate <= currentDate && x.EndDate >= currentDate))
                    {
                        isFreeDayStatus = true;
                        descriptionStatus += " Vacation";
                    }
                }

                if (!isFreeDayStatus)
                {
                    descriptionStatus = "busy";
                }
                
                //add it to our list
                newCalendar.monthdays.Add(new DayModel
                {
                    description = descriptionStatus,
                    day = iter,
                    name = currentDate.ToString("dddd"),
                    isFreeDay = isFreeDayStatus
                });

            }

            //return our calendar
            return Json(new { Calendar = newCalendar }, JsonRequestBehavior.DenyGet);
        }


    }

}