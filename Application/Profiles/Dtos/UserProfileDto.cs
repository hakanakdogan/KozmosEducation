using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Dtos
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public string NameSurname { get; set; }
        public string Interests { get; set; }
        public string Posts { get; set; }
        public string Education { get; set; }
    }
}
