using Application.Courses.Commands.CreateThumbnail;
using Application.Profiles.Commands.CreateProfile;
using Application.Profiles.Commands.DeleteProfile;
using Application.Profiles.Commands.UpdateProfile;
using Application.Profiles.Queries.GetProfile;
using Application.UserPosts.Commands.AttachFileToUserPost;
using Application.UserPosts.Commands.CreateUserPost;
using Application.UserPosts.Commands.DeleteUserPost;
using Application.UserPosts.Commands.UpdateUserPost;
using Application.UserPosts.Commands.UpsertUserPostReaction;
using Application.UserPosts.Queries.GetUserPost;
using Application.UserPosts.Queries.GetUserPosts;
using Application.UserPosts.Queries.GetUsersPost;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserPostController : BaseApiController
    {
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateUserPost (CreateUserPostCommand command)
        {
            return HandleResult(await Mediator.Send(command));
            
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateUserPost(UpdateUserPostCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteUserPostCommand { PostId = id }));
        }
        [HttpGet("userpost/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetUserPostQuery { Id = id }));
        }

        [HttpGet("userposts/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserPosts(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetUserPostsQuery { CourseId = id}));
        }

        [HttpGet("usersposts/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUsersPosts(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetUsersPostsQuery { UserId = id }));
        }

        [HttpPost("createreaction")]
        [Authorize]
        public async Task<IActionResult> UpsertUserPostReaction(UpsertUserPostReactionCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost("addImage/{id}")]
        [Authorize]
        public async Task<IActionResult> CraeteThumbnail(Guid id, IFormFile file)
        {
            return HandleResult(await Mediator.Send(new AttachFileToUserPostCommand { UserPostId = id, File = file }));
        }
    }
}
