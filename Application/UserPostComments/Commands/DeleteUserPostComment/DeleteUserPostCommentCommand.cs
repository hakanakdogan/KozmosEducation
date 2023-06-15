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

namespace Application.UserPostComments.Commands.DeleteUserPostComment
{
    public class DeleteUserPostCommentCommand : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }
    public class DeleteUserPostCommentCommandHandler : IRequestHandler<DeleteUserPostCommentCommand, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public DeleteUserPostCommentCommandHandler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _context = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(DeleteUserPostCommentCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<Unit>.Failure("Please authenticate first.");
            }
            var comment = await _context.UserPostComments.FirstOrDefaultAsync(x => x.Id == request.Id && x.AppUserId == user.Id);
            if (comment == null)
            {
                return Result<Unit>.Failure("There are no comments with given id or you have no permission.");
            }

            _context.UserPostComments.Remove(comment);

            var res = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Unit>.Failure("Something went wrong while creating comment");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
