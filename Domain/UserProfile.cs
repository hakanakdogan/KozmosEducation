using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserProfile
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string NameSurname { get; set; }
        public string Interests { get; set; }
        public string Posts { get; set; }
        public string Education { get; set; }

    }
}
