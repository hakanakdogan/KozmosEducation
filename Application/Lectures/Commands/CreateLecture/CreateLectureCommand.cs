using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Lectures.Commands.AddLecture
{
    public class CreateLectureCommand : IRequest<Result<Lecture>>
    {
        public Guid CourseModuleId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
    }
    public class AddLectureCommandHandler : IRequestHandler<CreateLectureCommand, Result<Lecture>>
    {
        private readonly DataContext _dataContext;

        public AddLectureCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Lecture>> Handle(CreateLectureCommand request, CancellationToken cancellationToken)
        {
            var lecture = new Lecture
            {
                CourseModuleId = request.CourseModuleId,
                Title = request.Title,
                Content = request.Content,
                Order = request.Order
            };

            _dataContext.Lectures.Add(lecture);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Lecture>.Failure("Failed to create lecture");
            }

            return Result<Lecture>.Success(lecture);
        }
    }
}
