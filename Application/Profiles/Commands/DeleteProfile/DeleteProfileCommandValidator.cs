using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands.DeleteProfile
{
    public class DeleteProfileCommandValidator : AbstractValidator<DeleteProfileCommand>
    {
        public DeleteProfileCommandValidator()
        {
            RuleFor(x => x.UserProfileId).NotEmpty().NotNull();   
        }
    }
}
