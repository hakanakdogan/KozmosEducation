using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Commands.CreateThumbnail
{
    public class CreateThumbnailCommandValidator : AbstractValidator<CreateThumbnailCommand>
    {
        public CreateThumbnailCommandValidator()
        {
            RuleFor(x => x.CourseId).NotEmpty().NotNull();
            RuleFor(x => x.File).NotEmpty().NotNull();
        }
    }
}
