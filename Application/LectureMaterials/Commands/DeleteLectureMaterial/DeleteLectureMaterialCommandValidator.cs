using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.LectureMaterials.Commands.DeleteLectureMaterial
{
    public class DeleteLectureMaterialCommandValidator : AbstractValidator<DeleteLectureMaterialCommand>
    {
        public DeleteLectureMaterialCommandValidator()
        {
            RuleFor(x => x.LectureMaterialId).NotEmpty().NotNull();
        }
    }
}
