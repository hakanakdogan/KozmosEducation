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

namespace Application.UserPosts.Commands.UpsertUserPostReaction
{
    public class UpsertUserPostReactionCommand : IRequest<Result<Unit>>
    {
        public Guid UserPostId { get; set; }
        public DynamicReactionType ReactionType { get; set; }
    }
    public class UpsertUserPostReactionCommandHandler : IRequestHandler<UpsertUserPostReactionCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public UpsertUserPostReactionCommandHandler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(UpsertUserPostReactionCommand request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
            {
                return Result<Unit>.Failure("Something went wrong");
            }

            var post = await _dataContext.UserPosts.Include(x => x.UserPostReactions).FirstOrDefaultAsync(x => x.Id == request.UserPostId);
            if (post == null)
            {
                return Result<Unit>.Failure("There is no post found with given id");
            }

            var existingReaction = post.UserPostReactions.FirstOrDefault(x => x.AppUserId == user.Id);
            if (existingReaction != null)
            {
                _dataContext.UserPostReactions.Remove(existingReaction);
            }
            else
            {
                var reaction = new UserPostReaction
                {
                    AppUserId = user.Id,
                    UserPostId = request.UserPostId,
                    ReactionType = request.ReactionType
                };

                _dataContext.UserPostReactions.Add(reaction);
            }

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<Unit>.Failure("Something went wrong while upserting user reaction");
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
