using Application.UserPostComments.Commands.AddUserPostComment;
using Application.UserPostComments.Commands.DeleteUserPostComment;
using Application.UserPostComments.Commands.UpdateUserPostComment;
using Application.UserPostComments.Queries.GetUserPostComment;
using Application.UserPostComments.Queries.GetUserPostComments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserPostCommentController : BaseApiController
    {
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateUserPostComment(AddUserPostCommentCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateUserPostComment(UpdateUserPostCommentCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserPostComment(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteUserPostCommentCommand { Id = id }));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserPostComment(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetUserPostCommentQuery { Id = id }));
        }

        [HttpGet("getComments/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserPostComments(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetUserPostCommentsQuery { UserPostId = id }));
        }
    }
}
