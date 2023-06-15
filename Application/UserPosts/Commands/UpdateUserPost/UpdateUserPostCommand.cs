using Application.Core;
using Application.Interfaces;
using Application.UserPostComments.Dtos;
using Application.UserPosts.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPosts.Commands.UpdateUserPost
{
    public class UpdateUserPostCommand : IRequest<Result<UserPostDto>>
    {
        public Guid PostId { get; set; }
        public string Text { get; set; }
        public string ImageUrl { get; set; }
    }
    public class UpdateUserPostCommandHandler : IRequestHandler<UpdateUserPostCommand, Result<UserPostDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public UpdateUserPostCommandHandler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserPostDto>> Handle(UpdateUserPostCommand request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<UserPostDto>.Failure("Something went wrong");
            }
            var userPost = await _dataContext.UserPosts.Include(x => x.UserPostComments).Include(x => x.UserPostReactions).Include(x => x.AppUser).Include(x => x.Course).FirstOrDefaultAsync(x => x.Id == request.PostId && x.AppUserId == user.Id);
            if (userPost == null)
            {
                return Result<UserPostDto>.Failure("There is no post found with given id or you have no permission to update the post");
            }
            userPost.Text = request.Text != null ? request.Text : userPost.Text;
            userPost.ImageUrl = request.ImageUrl != null ? request.ImageUrl : userPost.ImageUrl;
            _dataContext.UserPosts.Update(userPost);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<UserPostDto>.Failure("Something went wrong while updating the post");
            }
            var returnDto = new UserPostDto
            {
                Id = userPost.Id,
                AppUserId = userPost.AppUserId,
                UserName = userPost.AppUser.UserName,
                DisplayName = userPost.AppUser.DisplayName,
                CourseId = userPost.Course.Id,
                CourseName = userPost.Course.CourseName,
                ImageUrl = userPost.ImageUrl,
                Text = userPost.Text,
                UserReactions = userPost.UserPostReactions.Count() > 0 ? userPost.UserPostReactions.Select(a => new UserReactionDto
                {
                    Id = a.Id,
                    AppUserId = a.AppUserId,
                    UserPostId = a.UserPostId,
                    ReactionType = a.ReactionType
                }).ToList() : new List<UserReactionDto>(),
                UserComments = userPost.UserPostComments.Count >0 ? userPost.UserPostComments.Select(x => new UserPostCommentDto
                {
                    Id = x.Id,
                    AppUserId = x.AppUserId,
                    UserPostId = x.UserPostId,
                    Text = x.Text
                }).ToList() : new List<UserPostCommentDto>()
            };

            return Result<UserPostDto>.Success(returnDto);

        }
    }
}
