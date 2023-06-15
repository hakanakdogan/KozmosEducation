using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Commands.CreateCourse
{
    public class CreateCourseCommandValidator : AbstractValidator<CreateCourseCommand>
    {
        public CreateCourseCommandValidator()
        {
            RuleFor(x => x.CourseName).NotEmpty().MinimumLength(10);
            RuleFor(x => x.CourseDescription).NotEmpty().MinimumLength(10);
        }
    }
}
