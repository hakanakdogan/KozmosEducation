using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Application.Core;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Application.UserPosts.Dtos;
using Application.UserPostComments.Dtos;
using Microsoft.AspNetCore.Http;

namespace Application.UserPosts.Commands.CreateUserPost
{
    public class CreateUserPostCommand : IRequest<Result<UserPostDto>>
    {
        public Guid CourseId { get; set; }
        public string Text { get; set; }
    }
    public class CreateUserPostCommandHandler : IRequestHandler<CreateUserPostCommand, Result<UserPostDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;
        private readonly IStorageService _storageService;

        public CreateUserPostCommandHandler(DataContext dataContext, IUserAccessor userAccessor, IStorageService storageService)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
            _storageService = storageService;
        }

        public async Task<Result<UserPostDto>> Handle(CreateUserPostCommand request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<UserPostDto>.Failure("Something went wrong");
            }
            var course = await _dataContext.Courses.FirstOrDefaultAsync(x => x.Id == request.CourseId && x.Attendees.Any(x => x.AppUserId == user.Id));
            if (course == null)
            {
                return Result<UserPostDto>.Failure("There is no course with given id or you do not have permission to create a post in this courses social media area");
            }
            var userPost = new UserPost
            {
                CourseId = request.CourseId,
                AppUserId = user.Id,
                Text = request.Text,
            };
            

            _dataContext.UserPosts.Add(userPost);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<UserPostDto>.Failure("Something went wrong while creating user post");
            }

            var returnDto = new UserPostDto
            {
                Id = userPost.Id,
                AppUserId = userPost.AppUserId,
                UserName = userPost.AppUser.UserName,
                DisplayName = userPost.AppUser.DisplayName,
                CourseId = course.Id,
                CourseName = course.CourseName,
                ImageUrl = userPost.ImageUrl,
                Text = userPost.Text,
                UserReactions = userPost.UserPostReactions.Select(x => new UserReactionDto
                {
                    Id = x.Id,
                    AppUserId = x.AppUserId,
                    UserPostId = x.UserPostId,
                    ReactionType = x.ReactionType
                }).ToList(),
                UserComments = userPost.UserPostComments.Select(x => new UserPostCommentDto
                {
                    Id = x.Id,
                    AppUserId = x.AppUserId,
                    UserPostId = x.UserPostId,
                    Text = x.Text,
                }).ToList(),
                
            };

            return Result<UserPostDto>.Success(returnDto);

        }
    }
}
