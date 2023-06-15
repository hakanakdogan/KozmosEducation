using Application.UserPostComments.Dtos;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Dtos
{
    public class UserPostDto
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public Guid CourseId { get; set; }
        public string CourseName { get; set; }
        public string Text { get; set; }
        public string? ImageUrl { get; set; }
        public List<UserReactionDto> UserReactions { get; set; }
        public List<UserPostCommentDto> UserComments { get; set; }
        
    }
}
