using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Lectures.Commands.AddLecture
{
    public class CreateLectureCommandValidator : AbstractValidator<CreateLectureCommand>
    {
        public CreateLectureCommandValidator()
        {
            RuleFor(x => x.CourseModuleId).NotEmpty();
            RuleFor(x => x.Order).NotEmpty();
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
        }
    }
}
