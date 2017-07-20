using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HolidayManagement.Models
{
    public class DayModel
    {
        public string description { get; set; }
        public int day { get; set; }
        public string name { get; set; }
        public bool isFreeDay { get; set; }
    }
}