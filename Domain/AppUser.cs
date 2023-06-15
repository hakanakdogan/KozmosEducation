using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public UserProfile UserProfile { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<CourseAttendee> Courses { get; set; }
        public List<UserPost> UserPosts { get; set; }
        public List<UserPostReaction> UserPostReactions { get; set; }
        public List<UserPostComment> UserPostComments { get; set; }

    }
}
