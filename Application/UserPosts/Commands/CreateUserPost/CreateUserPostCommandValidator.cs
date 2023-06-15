using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.CreateUserPost
{
    internal class CreateUserPostCommandValidator : AbstractValidator<CreateUserPostCommand>
    {
        public CreateUserPostCommandValidator()
        {
            RuleFor(x => x.Text).NotEmpty().NotNull().MinimumLength(10);
        }
    }
}
