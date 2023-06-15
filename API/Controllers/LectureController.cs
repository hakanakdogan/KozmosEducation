using API.Constants;
using Application.Lectures.Commands.AddLecture;
using Application.Lectures.Commands.DeleteLecture;
using Application.Lectures.Commands.UpdateLecture;
using Application.Lectures.Queries.GetLecture;
using Application.Lectures.Queries.GetLectures;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LectureController : BaseApiController
    {
        [HttpPost]
        [Authorize(Roles = $"{Roles.Egitmen},{Roles.Admin}")]
        public async Task<IActionResult> CreateLecture(CreateLectureCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut]
        [Authorize(Roles = $"{Roles.Egitmen},{Roles.Admin}")]
        public async Task<IActionResult> UpdateLecture(UpdateLectureCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = $"{Roles.Egitmen},{Roles.Admin}")]
        public async Task<IActionResult> DeleteLecture(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteLectureCommand { Id = id }));
        }
        [HttpGet("GetLectures/{id}")]
        [Authorize]
        public async Task<IActionResult> GetLectures(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetLecturesQuery { ModuleId = id }));   
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult>GetLecture(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetLectureQuery { Id = id }));  
        }
    }
}
