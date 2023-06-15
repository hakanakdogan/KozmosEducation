using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Dtos
{
    public class UserReactionDto
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public Guid UserPostId { get; set; }
        public DynamicReactionType ReactionType { get; set; }
    }
}
