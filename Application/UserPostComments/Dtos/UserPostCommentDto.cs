using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPostComments.Dtos
{
    public class UserPostCommentDto
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public Guid UserPostId { get; set; }
        public string Text { get; set; }
    }
}
