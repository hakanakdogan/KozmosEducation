using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.AttachFileToUserPost
{
    public class AttachFileToUserPostCommandValidator : AbstractValidator<AttachFileToUserPostCommand>
    {
        public AttachFileToUserPostCommandValidator()
        {
            RuleFor(x => x.UserPostId).NotEmpty().NotNull();
            RuleFor(x => x.File).NotEmpty().NotNull();
        }
    }
}
