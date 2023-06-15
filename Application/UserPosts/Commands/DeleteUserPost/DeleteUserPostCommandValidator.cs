using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.DeleteUserPost
{
    public class DeleteUserPostCommandValidator : AbstractValidator<DeleteUserPostCommand>
    {
        public DeleteUserPostCommandValidator()
        {
            RuleFor(x => x.PostId).NotEmpty().NotNull();
        }
    }
}
