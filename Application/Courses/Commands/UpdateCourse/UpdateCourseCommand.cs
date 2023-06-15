using Application.Core;
using Application.CourseModules.Dtos;
using Application.Courses.Dtos;
using Application.Lectures.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Commands.UpdateCourse
{
    public class UpdateCourseCommand : IRequest<Result<CourseDto>>
    {
        public Guid Id { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public string Thumbnail { get; set; }
        public Guid? CourseCategoryId { get; set; }
        public string? MetamaskId { get; set; }
        public float Price { get; set; }
    }
    public class UpdateCourseCommandHandler : IRequestHandler<UpdateCourseCommand, Result<CourseDto>>
    {
        private readonly DataContext _dataContext;

        public UpdateCourseCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<CourseDto>> Handle(UpdateCourseCommand request, CancellationToken cancellationToken)
        {
            var course = await _dataContext.Courses
                .Include(x => x.Attendees)
                .ThenInclude(a => a.AppUser)
                .Include(x => x.CourseModules)
                .ThenInclude(a => a.Lectures)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            if (course == null)
            {
                return Result<CourseDto>.Failure("There are no courses found with given Id");
            }

            course.CourseName = request.CourseName != null ? request.CourseName : course.CourseName;
            course.CourseDescription = request.CourseDescription != null ? request.CourseDescription : course.CourseDescription;
            course.Thumbnail = request.Thumbnail != default ? request.Thumbnail : course.Thumbnail;
            course.CourseCategoryId = request.CourseCategoryId != default ? request.CourseCategoryId : course.CourseCategoryId;
            course.MetamaskId = request.MetamaskId != default ? request.MetamaskId : course.MetamaskId;
            course.Price = request.Price != default ? request.Price : course.Price;

            _dataContext.Courses.Update(course);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<CourseDto>.Failure("Something went wrong while updating course");
            }

            var courseDto = new CourseDto
            {

                CourseId = course.Id.ToString(),
                CourseDescription = course.CourseDescription,
                CourseName = course.CourseName,
                Thumbnail = course.Thumbnail,
                MetamaskId = course.MetamaskId,
                Price = course.Price,
                Attendees = course.Attendees.Select(y => new AttendeeDto
                {
                    DisplayName = y.AppUser.DisplayName,
                    Id = y.AppUserId,
                    UserName = y.AppUser.UserName,
                    IsCreator = y.IsCreator
                }).ToList(),
                CourseModules = course.CourseModules.Select(xx => new CourseModuleDto
                {
                    Id = xx.Id,
                    Order = xx.Order,
                    Title = xx.Title,
                    Lectures = xx.Lectures.Select(aa => new LectureDto
                    {
                        Id = aa.Id,
                        Content = aa.Content,
                        Order = aa.Order,
                        Title = aa.Title

                    }).ToList()
                }).ToList()
            };

            return Result<CourseDto>.Success(courseDto);

        }
    }
}
