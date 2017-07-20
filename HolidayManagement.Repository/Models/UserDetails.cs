using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HolidayManagement.Repository.Models
{
    public class UserDetails
    {
        [Key]
        public int ID { get; set; }

        public string UserID { get; set; } //relevation between UserDetails and AspNetUsers tables

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? HireDate { get; set; } // ? - not mandatory - nullable - ( nem szukseges )

        public int? MaxDays { get; set; } // ? - not mandatory - nullable - ( nem szukseges )

        public int? TeamId { get; set; } // ? - not mandatory - nullable - ( nem szukseges )



        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; }

        [ForeignKey("UserID")]
        public virtual IdentityUser AspNetUser { get; set; } //relevation between UserDetails and AspNetUsers tables

    }
}