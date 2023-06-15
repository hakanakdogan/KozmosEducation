using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.DeleteUserPost
{
    public class DeleteUserPostCommand : IRequest<Result<Unit>>
    {
        public Guid PostId { get; set; }
    }
    public class DeleteUserPostCommandHandler : IRequestHandler<DeleteUserPostCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;
        private readonly IStorageService _storageService;

        public DeleteUserPostCommandHandler(DataContext dataContext, IUserAccessor userAccessor, IStorageService storageService)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
            _storageService = storageService;
        }

        public async Task<Result<Unit>> Handle(DeleteUserPostCommand request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<Unit>.Failure("Something went wrong");
            }
            var post = await _dataContext.UserPosts.FirstOrDefaultAsync(x => x.Id == request.PostId && x.AppUserId == user.Id);
            if (post == null)
            {
                return Result<Unit>.Failure("There is no post found with given id or you have no permission to delete the post");
            }

            if (post.ImageUrl != null)
            {
                var docName = post.ImageUrl.Substring(post.ImageUrl.LastIndexOf("/") + 1);

                var storageRes = await _storageService.DeleteFileAsync(docName);

                if (storageRes == null || storageRes.StatusCode != 200)
                {
                    return Result<Unit>.Failure($"Error while deleting file: {storageRes.Message}");
                }
            }
            _dataContext.UserPosts.Remove(post);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<Unit>.Failure("Something went wrong while deleting the post");
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
