using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPostComments.Commands.DeleteUserPostComment
{
    public class DeleteUserPostCommentCommandValidator : AbstractValidator<DeleteUserPostCommentCommand>
    {
        public DeleteUserPostCommentCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty().NotNull();
        }
    }
}
