using HolidayManagement.Repository.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace HolidayManagement.Models
{   
    //create a new dashboard model
    public class DashboardViewModel
    {
        public string userID { get;  set;}
        public List<UserDetails> userL { get; set; }
        public List<Team> teamL { get; set; }
        public List<IdentityRole> roleL { get; set; }
        public CalendarModel calendar { get; set; }
    }
    
}