using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPostComments.Commands.UpdateUserPostComment
{
    public class UpdateUserPostCommentCommandValidator : AbstractValidator<UpdateUserPostCommentCommand>
    {
        public UpdateUserPostCommentCommandValidator()
        {
            RuleFor(x => x.Id).NotNull().NotEmpty();
            RuleFor(x => x.Text).NotNull().NotEmpty();
        }
    }
}
