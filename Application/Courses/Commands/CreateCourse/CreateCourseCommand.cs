using Application.Core;
using Application.CourseModules.Dtos;
using Application.Courses.Dtos;
using Application.Interfaces;
using Application.Lectures.Dtos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Commands.CreateCourse
{
    public class CreateCourseCommand : IRequest<Result<CourseDto>>
    {
        public Guid CourseCategoryId { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public string Thumbnail { get; set; }
        public string? MetamaskId { get; set; }
        public float Price { get; set; }
    }

    public class CreateCourseCommandHandler : IRequestHandler<CreateCourseCommand, Result<CourseDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateCourseCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<CourseDto>> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());

            var course = new Course
            {
                CourseCategoryId = request.CourseCategoryId,
                CourseDescription = request.CourseDescription,
                CourseName = request.CourseName,
                Thumbnail = request.Thumbnail,
                MetamaskId = request.MetamaskId,
                Price = request.Price,
            };


            var attendee = new CourseAttendee
            {
                AppUser = user,
                Course = course,
                IsCreator = true,
            };

            course.Attendees.Add(attendee);

            _context.Courses.Add(course); 

             var res = await _context.SaveChangesAsync(cancellationToken) >0;

            


            if (!res)
            {
                return Result<CourseDto>.Failure("Failed to create course");
            }
            var dbCourse = await _context.Courses.Include(x => x.Attendees).ThenInclude(a => a.AppUser).Include(x => x.CourseModules).ThenInclude(a=> a.Lectures).FirstOrDefaultAsync(x => x.Id == course.Id);

            var courseDto = new CourseDto
            {

                CourseId = dbCourse.Id.ToString(),
                CourseDescription = dbCourse.CourseDescription,
                CourseName = dbCourse.CourseName,
                Thumbnail = dbCourse.Thumbnail,
                MetamaskId = dbCourse.MetamaskId,
                Price = dbCourse.Price,
                Attendees = dbCourse.Attendees.Select(y => new AttendeeDto
                {
                    DisplayName = y.AppUser.DisplayName,
                    Id = y.AppUserId,
                    UserName = y.AppUser.UserName,
                    IsCreator = y.IsCreator
                }).ToList(),
                CourseModules = dbCourse.CourseModules.Select(xx => new CourseModuleDto
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
