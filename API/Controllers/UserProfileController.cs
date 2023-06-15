using Application.Profiles.Commands.CreateProfile;
using Application.Profiles.Commands.DeleteProfile;
using Application.Profiles.Commands.UpdateProfile;
using Application.Profiles.Queries.GetProfile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserProfileController : BaseApiController
    {
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProfile(CreateProfileCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateProfile(UpdateProfileCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProfile(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteProfileCommand { UserProfileId = id }));
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetPofile(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetProfileQuery { UserId = id }));
        }
    }
}
