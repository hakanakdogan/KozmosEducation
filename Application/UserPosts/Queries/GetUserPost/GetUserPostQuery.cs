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

namespace Application.UserPosts.Queries.GetUserPost
{
    public class GetUserPostQuery : IRequest<Result<UserPostDto>>
    {
        public Guid Id { get; set; }
    }
    public class GetUSerPostQueryHandler : IRequestHandler<GetUserPostQuery, Result<UserPostDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public GetUSerPostQueryHandler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserPostDto>> Handle(GetUserPostQuery request, CancellationToken cancellationToken)
        {
            var userPost = await _dataContext.UserPosts.Include(x => x.UserPostReactions).Include(x => x.AppUser).Include(x => x.Course).FirstOrDefaultAsync(x => x.Id == request.Id);
            if (userPost == null)
            {
                return Result<UserPostDto>.Failure("There is no post found with give id");
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
                UserComments = userPost.UserPostComments.Count > 0 ? userPost.UserPostComments.Select(x => new UserPostCommentDto
                {
                    Id = x.Id,
                    AppUserId = x.AppUserId,
                    UserPostId = x.UserPostId,
                    Text = x.Text,
                    DisplayName = x.AppUser.DisplayName,
                    UserName = x.AppUser.UserName,
                }).ToList() : new List<UserPostCommentDto>()
            };
            return Result<UserPostDto>.Success(returnDto);
        }
    }
}
