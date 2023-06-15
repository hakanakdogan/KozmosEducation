using Application.Courses.Commands.AttendCourse;
using Application.Courses.Commands.CreateCourse;
using Application.Courses.Commands.CreateThumbnail;
using Application.Courses.Commands.RemoveThumbnail;
using Application.Courses.Commands.UpdateCourse;
using Application.Courses.Courses.GetCourse;
using Application.Courses.Courses.GetCourses;
using Application.Courses.Queries.GetInstructorCourses;
using Application.Courses.Queries.GetInstructorCoursesById;
using Application.Courses.Queries.GetUserCourses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class CourseController : BaseApiController
    {
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCourse(CreateCourseCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateCourse(UpdateCourseCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCourses()
        {
            return HandleResult(await Mediator.Send(new GetCoursesQuery()));
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCourse(string id)
        {
            return HandleResult(await Mediator.Send(new GetCourseQuery { CourseId = id}));
        }
        [HttpGet("usercourses")]
        [Authorize]
        public async Task<IActionResult> GetUserCourses()
        {
            return HandleResult(await Mediator.Send(new GetUserCoursesQuery()));
        }
        [HttpGet("instructorcourses")]
        [Authorize]
        public async Task<IActionResult> GetInstructorCourses()
        {
            return HandleResult(await Mediator.Send(new GetInstructorCoursesQuery()));
        }

        [HttpGet("instructorcourses/{id}")]
        [Authorize]
        public async Task<IActionResult> GetInstructorCoursesById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetInstructorCoursesByIdQuery { UserId = id}));
        }
        [HttpPost("attend")]
        [Authorize]
        public async Task<IActionResult> AttendCourse(AttendCourseCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPost("addThumbnail/{id}")]
        [Authorize]
        public async Task<IActionResult> CraeteThumbnail(Guid id, IFormFile file)
        {
            return HandleResult(await Mediator.Send(new CreateThumbnailCommand { CourseId = id, File = file }));
        }

        [HttpDelete("deleteThumbnail/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteThumbnail(Guid id)
        {
            return HandleResult(await Mediator.Send(new RemoveThumbnailCommand { CourseId = id })); 
        }


    }
}
