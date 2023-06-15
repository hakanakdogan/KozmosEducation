using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Application.Courses.Commands.AttendCourse
{
    public class AttendCourseCommand : IRequest<Result<Unit>>
    {
        public string CourseId { get; set; }
        public string AttendPrivateKey { get; set; }
    }
    public class AttendCourseCommandHandler : IRequestHandler<AttendCourseCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;
        private readonly IConfiguration _configuration;

        public AttendCourseCommandHandler(DataContext dataContext, IUserAccessor userAccessor, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
            _configuration = configuration;
        }

        public async Task<Result<Unit>> Handle(AttendCourseCommand request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var course = await _dataContext.Courses.Include(u=>u.Attendees).ThenInclude(uu=>uu.AppUser).FirstOrDefaultAsync(x => x.Id.ToString() == request.CourseId);

            if (course == null)
            {
                return Result<Unit>.Failure("There are no courses with given id");
            }

            var isAttendeeExist = course.Attendees.Any(x => x.AppUserId == user.Id);
            if (isAttendeeExist)
            {
                return Result<Unit>.Failure("You have already enrolled this course");
            }

            if (request.AttendPrivateKey != _configuration["Secrets:AttendPrivatekey"])
            {
                return Result<Unit>.Failure("Private keys does not match");
            }

            course.Attendees.Add(new CourseAttendee
            {
                AppUser = user,
                Course = course,
                IsCreator = false
            });

            await _dataContext.SaveChangesAsync();

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
