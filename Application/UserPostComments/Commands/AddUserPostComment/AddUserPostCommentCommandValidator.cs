using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPostComments.Commands.AddUserPostComment
{
    public class AddUserPostCommentCommandValidator : AbstractValidator<AddUserPostCommentCommand>
    {
        public AddUserPostCommentCommandValidator()
        {
            RuleFor(x => x.UserPostId).NotEmpty().NotNull();
            RuleFor(x => x.Text).NotEmpty().NotNull();
        }
    }
}
