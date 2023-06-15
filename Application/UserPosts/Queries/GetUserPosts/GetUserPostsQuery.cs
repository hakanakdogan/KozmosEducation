using Application.Core;
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

namespace Application.UserPosts.Queries.GetUserPosts
{
    public class GetUserPostsQuery : IRequest<Result<List<UserPostDto>>>
    {
        public Guid CourseId { get; set; }
    }
    public class GetUSerPostsQueryHandler : IRequestHandler<GetUserPostsQuery, Result<List<UserPostDto>>>
    {
        private readonly DataContext _dataContext;

        public GetUSerPostsQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<UserPostDto>>> Handle(GetUserPostsQuery request, CancellationToken cancellationToken)
        {
            var entities = await _dataContext.UserPosts.Include(x => x.UserPostReactions).Include(x => x.AppUser).Include(x => x.Course).Where(x => x.CourseId == request.CourseId).Select(x => new UserPostDto
            {
                Id = x.Id,
                AppUserId = x.AppUserId,
                UserName = x.AppUser.UserName,
                DisplayName = x.AppUser.DisplayName,
                CourseId = x.Course.Id,
                CourseName = x.Course.CourseName,
                ImageUrl = x.ImageUrl,
                Text = x.Text,
                UserReactions = x.UserPostReactions.Count() > 0 ? x.UserPostReactions.Select(a => new UserReactionDto
                {
                    Id = a.Id,
                    AppUserId = a.AppUserId,
                    UserPostId = a.UserPostId,
                    ReactionType = a.ReactionType
                }).ToList() : new List<UserReactionDto>(),
                UserComments = x.UserPostComments.Count > 0 ? x.UserPostComments.Select(a => new UserPostCommentDto
                {
                    Id = a.Id,
                    AppUserId = a.AppUserId,
                    UserPostId = a.UserPostId,
                    Text = a.Text,
                    DisplayName = a.AppUser.DisplayName,
                    UserName = a.AppUser.UserName
                }).ToList() : new List<UserPostCommentDto>()
            }).ToListAsync(cancellationToken);

            return Result<List<UserPostDto>>.Success(entities);
        }
    }
}
