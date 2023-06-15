using Application.Core;
using Application.CourseModules.Dtos;
using Application.Courses.Dtos;
using Application.Lectures.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Queries.GetInstructorCoursesById
{
    public class GetInstructorCoursesByIdQuery : IRequest<Result<List<CourseDto>>>
    {
        public Guid UserId { get; set; }
    }
    public class GetInstructorCoursesByIdQueryHandler : IRequestHandler<GetInstructorCoursesByIdQuery, Result<List<CourseDto>>>
    {
        private readonly DataContext _dataContext;

        public GetInstructorCoursesByIdQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<CourseDto>>> Handle(GetInstructorCoursesByIdQuery request, CancellationToken cancellationToken)
        {
            var userCourses = await _dataContext.Courses
                .Include(y => y.Attendees)
                .ThenInclude(u => u.AppUser)
                .Include(x => x.CourseModules)
                .ThenInclude(x => x.Lectures)
                .ThenInclude(x => x.LectureMaterial)
                .Where(x => x.Attendees.Any(u => u.AppUserId == request.UserId.ToString() && u.IsCreator == true)).Select(xx => new CourseDto
                {

                    CourseId = xx.Id.ToString(),
                    CourseDescription = xx.CourseDescription,
                    CourseName = xx.CourseName,
                    CourseCategory = xx.CourseCategory.Name,
                    Thumbnail = xx.Thumbnail,
                    MetamaskId = xx.MetamaskId,
                    Price = xx.Price,
                    Attendees = xx.Attendees.Select(y => new AttendeeDto
                    {
                        DisplayName = y.AppUser.DisplayName,
                        Id = y.AppUserId,
                        UserName = y.AppUser.UserName,
                        IsCreator = y.IsCreator
                    }).ToList(),
                    CourseModules = xx.CourseModules.Select(xx => new CourseModuleDto
                    {
                        Id = xx.Id,
                        Order = xx.Order,
                        Title = xx.Title,
                        Lectures = xx.Lectures.Select(aa => new LectureDto
                        {
                            Id = aa.Id,
                            Content = aa.Content,
                            Order = aa.Order,
                            Title = aa.Title,
                            LectureMaterial = aa.LectureMaterial

                        }).ToList()
                    }).ToList()
                }).ToListAsync();
            return Result<List<CourseDto>>.Success(userCourses);
        }
    }
}
