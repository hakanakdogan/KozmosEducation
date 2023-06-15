using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Lectures.Commands.UpdateLecture
{
    public class UpdateLectureCommandValidator : AbstractValidator<UpdateLectureCommand>
    {
        public UpdateLectureCommandValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}
