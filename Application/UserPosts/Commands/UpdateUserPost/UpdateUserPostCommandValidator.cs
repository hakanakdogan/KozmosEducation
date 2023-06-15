using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.UpdateUserPost
{
    public class UpdateUserPostCommandValidator : AbstractValidator<UpdateUserPostCommand>
    {
        public UpdateUserPostCommandValidator()
        {
            RuleFor(x => x.PostId).NotEmpty().NotNull();
        }
    }
}
