using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserPost
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public string Text { get; set; }
        public string? ImageUrl { get; set; }
        public List<UserPostReaction> UserPostReactions { get; set; } = new List<UserPostReaction>();
        public List<UserPostComment> UserPostComments { get; set; } = new List<UserPostComment>();

    }
}
