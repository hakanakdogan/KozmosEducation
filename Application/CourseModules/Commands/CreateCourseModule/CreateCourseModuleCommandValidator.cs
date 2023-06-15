using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseModules.Commands.CreateCourseModule
{
    public class CreateCourseModuleCommandValidator : AbstractValidator<CreateCourseModuleCommand>
    {
        public CreateCourseModuleCommandValidator()
        {
            RuleFor(x => x.CourseId).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}
