using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.LectureMaterials.Commands.CreateLectureMaterial
{
    public class CreateLectureMaterialCommandValidator : AbstractValidator<CreateLectureMaterialCommand>
    {
        public CreateLectureMaterialCommandValidator()
        {
            RuleFor(x => x.LectureId).NotEmpty().NotNull();
            RuleFor(x => x.File).NotEmpty().NotNull();
        }
    }
}
