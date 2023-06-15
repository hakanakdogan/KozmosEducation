using API.Constants;
using Application.CourseModules.Commands.CreateCourseModule;
using Application.CourseModules.Commands.DeleteCourseModule;
using Application.CourseModules.Commands.UpdateCourseModule;
using Application.CourseModules.Queries.GetCourseModule;
using Application.CourseModules.Queries.GetCourseModules;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class CourseModuleController : BaseApiController
    {
        [HttpPost]
        [Authorize(Roles = $"{Roles.Egitmen},{Roles.Admin}")]
        public async Task<IActionResult> CreateCourseModule(CreateCourseModuleCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut]
        [Authorize(Roles = $"{Roles.Egitmen},{Roles.Admin}")]
        public async Task<IActionResult> UpdateCourseModule(UpdateCourseModuleCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = $"{Roles.Egitmen},{Roles.Admin}")]
        public async Task<IActionResult> DeleteCourseModule(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCourseModuleCommand { Id = id }));
        }
        [HttpGet("CourseModules/{id}")]
        [Authorize]
        public async Task<IActionResult> GetCourseModules(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetCourseModulesQuery { CourseId = id }));
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCourseModule(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetCourseModuleQuery { Id = id }));
        }
    }
}
