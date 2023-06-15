using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserPostReaction
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid UserPostId { get; set; }
        public UserPost UserPost { get; set; }
        public DynamicReactionType ReactionType { get; set; }

    }

    public enum DynamicReactionType
    {
        Like = 1,
        Haha,
        Sad,
        Clap
    }
}
