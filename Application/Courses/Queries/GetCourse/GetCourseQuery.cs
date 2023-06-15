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
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Courses.GetCourse
{
    public class GetCourseQuery : IRequest<Result<CourseDto>>
    {
        public string CourseId { get; set; }
    }
    public class GetCourseQueryHandler : IRequestHandler<GetCourseQuery, Result<CourseDto>>
    {
        private readonly DataContext _context;

        public GetCourseQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<CourseDto>> Handle(GetCourseQuery request, CancellationToken cancellationToken)
        {
            var course = await _context.Courses
                .Include(y => y.Attendees)
                .ThenInclude(u => u.AppUser)
                .Include(x => x.CourseModules)
                .ThenInclude(x => x.Lectures)
                .ThenInclude(x => x.LectureMaterial)
                .Where(u => u.Id.ToString() == request.CourseId).Select(xx => new CourseDto
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
                }).FirstOrDefaultAsync();
            
            return Result<CourseDto>.Success(course);
        }
    }
}
