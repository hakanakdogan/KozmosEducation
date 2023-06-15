using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.AttachFileToUserPost
{
    public class AttachFileToUserPostCommand : IRequest<Result<Unit>>
    {
        public Guid UserPostId { get; set; }
        public IFormFile File { get; set; }
    }
    public class AttachFileToUserPostCommandHandler : IRequestHandler<AttachFileToUserPostCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IStorageService _storageService;
        private readonly IUserAccessor _userAccessor;

        public AttachFileToUserPostCommandHandler(DataContext dataContext, IStorageService storageService, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _storageService = storageService;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(AttachFileToUserPostCommand request, CancellationToken cancellationToken)
        {
            var userPost = await _dataContext.UserPosts.FirstOrDefaultAsync(x => x.Id == request.UserPostId);
            if (userPost == null)
            {
                return Result<Unit>.Failure("There are no user post found with given id");
            }
            var user = await _dataContext.Users.Include(x => x.UserPosts).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var isCreator = user.UserPosts.Any(x => x.Id == userPost.Id);
            if (!isCreator)
            {
                return Result<Unit>.Failure("You are not the owner of the post");
            }

            var storageRes = await _storageService.UploadFileAsync(request.File);

            if (storageRes == null || storageRes.StatusCode != 200)
            {
                return Result<Unit>.Failure($"Error while uploading file: {storageRes.Message}");
            }

            userPost.ImageUrl = storageRes.Url;

            _dataContext.UserPosts.Update(userPost);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Unit>.Failure("Somenthing went wrong while creating image");
            }

            return Result<Unit>.Success(Unit.Value);


        }
    }
}
