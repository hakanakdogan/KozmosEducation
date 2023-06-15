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

namespace Application.UserPostComments.Commands.UpdateUserPostComment
{
    public class UpdateUserPostCommentCommand : IRequest<Result<UserPostCommentDto>>
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
    }
    public class UpdateUserPostCommentCommandHandler : IRequestHandler<UpdateUserPostCommentCommand, Result<UserPostCommentDto>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public UpdateUserPostCommentCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserPostCommentDto>> Handle(UpdateUserPostCommentCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<UserPostCommentDto>.Failure("Please authenticate first.");
            }
            var comment = await _context.UserPostComments.FirstOrDefaultAsync(x => x.Id == request.Id && x.AppUserId == user.Id);
            if (comment == null)
            {
                return Result<UserPostCommentDto>.Failure("There are no comments with given id or you have no permission.");
            }

            comment.Text = request.Text != null ? request.Text : comment.Text;

            _context.UserPostComments.Update(comment);

            var res = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<UserPostCommentDto>.Failure("Something went wrong while updating the comment");
            }

            return Result<UserPostCommentDto>.Success(new UserPostCommentDto
            {
                AppUserId = comment.AppUserId,
                Id = comment.Id,
                Text = comment.Text,
                UserPostId = comment.UserPostId,
                DisplayName = user.DisplayName,
                UserName = user.UserName,
            });

        }
    }
}
