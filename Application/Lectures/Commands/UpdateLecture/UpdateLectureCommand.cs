using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Lectures.Commands.UpdateLecture
{
    public class UpdateLectureCommand : IRequest<Result<Lecture>>
    {
        public Guid Id { get; set; }
        public Guid CourseModuleId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
    }
    public class UpdateLectureCommandHandler : IRequestHandler<UpdateLectureCommand, Result<Lecture>>
{
        private readonly DataContext _dataContext;

        public UpdateLectureCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Lecture>> Handle(UpdateLectureCommand request, CancellationToken cancellationToken)
        {
            var lecture = await _dataContext.Lectures.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (lecture == null)
            {
                return Result<Lecture>.Failure("There are no lectures with given Id");
            }

            lecture.Title = request.Title != null ? request.Title : lecture.Title;
            lecture.Content = request.Content != null ? request.Content : lecture.Content;
            lecture.Order = request.Order != default ? request.Order : lecture.Order;
            lecture.CourseModuleId = request.CourseModuleId != default ? request.CourseModuleId : lecture.CourseModuleId;

            _dataContext.Lectures.Update(lecture);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Lecture>.Failure("Something went wrong while updating lecture");
            }

            return Result<Lecture>.Success(lecture);
        }
    }
}
