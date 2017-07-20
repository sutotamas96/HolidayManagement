using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{
    public class CalendarModel
    {   
        public List<Vacation> vacations { get; set; }
        public List<BankHoliday> bankholidays { get; set; }
        public List<DayModel> monthdays { get; set; }
    }
}