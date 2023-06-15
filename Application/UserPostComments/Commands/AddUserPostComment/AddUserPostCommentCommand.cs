using Application.Core;
using Application.Interfaces;
using Application.UserPostComments.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserPostComments.Commands.AddUserPostComment
{
    public class AddUserPostCommentCommand : IRequest<Result<UserPostCommentDto>>
    {
        public Guid UserPostId { get; set; }
        public string Text { get; set; }
    }
    public class AddUserPostCommentCommandHandler : IRequestHandler<AddUserPostCommentCommand, Result<UserPostCommentDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public AddUserPostCommentCommandHandler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserPostCommentDto>> Handle(AddUserPostCommentCommand request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<UserPostCommentDto>.Failure("Please authenticate first.");
            }
            var comment = new UserPostComment
            {
                AppUserId = user.Id,
                UserPostId = request.UserPostId,
                Text = request.Text,                
            };

            _dataContext.UserPostComments.Add(comment);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<UserPostCommentDto>.Failure("Something went wrong while creating comment");
            }

            return Result<UserPostCommentDto>.Success(new UserPostCommentDto
            {
                AppUserId= comment.AppUserId,
                Id = comment.Id,
                Text= comment.Text,
                UserPostId = comment.UserPostId,
                DisplayName = user.DisplayName,
                UserName = user.UserName
            });

        }
    }
}
