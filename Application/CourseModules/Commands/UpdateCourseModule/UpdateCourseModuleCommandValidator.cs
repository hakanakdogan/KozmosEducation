using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseModules.Commands.UpdateCourseModule
{
    public class UpdateCourseModuleCommandValidator : AbstractValidator<UpdateCourseModuleCommand>
    {
        public UpdateCourseModuleCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}
