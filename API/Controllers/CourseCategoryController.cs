using API.Constants;
using Application.CourseCategories.Commands.CreateCourseCategory;
using Application.CourseCategories.Commands.DeleteCourseCategory;
using Application.CourseCategories.Commands.UpdateCourseCategory;
using Application.CourseCategories.Queries.GetCourseCategories;
using Application.CourseCategories.Queries.GetCourseCategory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CourseCategoryController : BaseApiController
    {
        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateCourseCategory(CreateCourseCategoryCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> UpdateCourseCategory(UpdateCourseCategoryCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteCourseCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteCourseCategoryCommand { Id = id }));
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCourseCategories()
        {
            return HandleResult(await Mediator.Send(new GetCourseCategoriesQuery()));
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCourseCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetCourseCategoryQuery { Id = id }));
        }
    }
}
