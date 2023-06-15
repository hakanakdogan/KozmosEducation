using Application.Core;
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

namespace Application.UserPostComments.Queries.GetUserPostComments
{
    public class GetUserPostCommentsQuery : IRequest<Result<List<UserPostCommentDto>>>
    {
        public Guid UserPostId { get; set; }
    }
    public class GetUserPostCommentsQueryHandler : IRequestHandler<GetUserPostCommentsQuery, Result<List<UserPostCommentDto>>>
    {
        private readonly DataContext _context;

        public GetUserPostCommentsQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<UserPostCommentDto>>> Handle(GetUserPostCommentsQuery request, CancellationToken cancellationToken)
        {
            var comments = await _context.UserPostComments.Include(x => x.AppUser).Where(x => x.UserPostId == request.UserPostId).Select(x => new UserPostCommentDto
            {
                AppUserId = x.AppUserId,
                Id = x.Id,
                Text = x.Text,
                UserPostId = x.UserPostId,
                DisplayName = x.AppUser.DisplayName,
                UserName = x.AppUser.UserName
            }).ToListAsync(cancellationToken);
            return Result<List<UserPostCommentDto>>.Success(comments);
        }
    }
}
