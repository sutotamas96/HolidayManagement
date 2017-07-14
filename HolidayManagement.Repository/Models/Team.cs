using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HolidayManagement.Repository.Models
{
    public class Team
    {
        [Key]
        public int ID { get; set; }

        public string Description { get; set; }
        
        public virtual ICollection<UserDetails> Users { get; set; }
    }


}
