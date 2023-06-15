using Application.Core;
using Application.CourseModules.Dtos;
using Application.Courses.Dtos;
using Application.Interfaces;
using Application.Lectures.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Queries.GetUserCourses
{
    public class GetUserCoursesQuery : IRequest<Result<List<CourseDto>>>
    {
        
    }
    public class GetUserCoursesQueryHandler : IRequestHandler<GetUserCoursesQuery, Result<List<CourseDto>>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public GetUserCoursesQueryHandler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<List<CourseDto>>> Handle(GetUserCoursesQuery request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var userCourses = await _dataContext.Courses
                .Include(y => y.Attendees)
                .ThenInclude(u => u.AppUser)
                .Include(x => x.CourseModules)
                .ThenInclude(x => x.Lectures)
                .ThenInclude(x => x.LectureMaterial)
                .Where(x=> x.Attendees.Any(u=> u.AppUserId == user.Id && u.IsCreator == false)).Select(xx => new CourseDto
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
