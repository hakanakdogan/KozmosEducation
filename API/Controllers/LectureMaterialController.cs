using Application.LectureMaterials.Commands.CreateLectureMaterial;
using Application.LectureMaterials.Commands.DeleteLectureMaterial;
using Application.LectureMaterials.Queries.GetLectureMaterial;
using Application.LectureMaterials.Queries.GetLectureMaterialByLecture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LectureMaterialController : BaseApiController
    {
        [HttpPost("{id}")]
        [Authorize]
        public async Task<IActionResult> CreateLectureMaterial(Guid id, IFormFile file)
        {
            return HandleResult(await Mediator.Send(new CreateLectureMaterialCommand { File = file, LectureId = id}));  
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteLectureMaterial(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteLectureMaterialCommand { LectureMaterialId = id }));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLectureMaterial(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetLectureMaterialQuery { Id = id }));
        }

        [HttpGet("byLecture/{id}")]
        [Authorize]
        public async Task<IActionResult> GetLectureMaterialByLecture(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetLectureMaterialByLectureQuery { LectureId = id }));
        }
    }
}
