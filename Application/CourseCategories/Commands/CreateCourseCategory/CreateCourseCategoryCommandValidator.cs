using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseCategories.Commands.CreateCourseCategory
{
    public class CreateCourseCategoryCommandValidator : AbstractValidator<CreateCourseCategoryCommand>
    {
        public CreateCourseCategoryCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MinimumLength(3);
        }
    }
}
