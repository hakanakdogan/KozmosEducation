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

namespace Application.UserPostComments.Queries.GetUserPostComment
{
    public class GetUserPostCommentQuery : IRequest<Result<UserPostCommentDto>>
    {
        public Guid Id { get; set; }
    }

    public class GetUserPostCommentQueryHandler : IRequestHandler<GetUserPostCommentQuery, Result<UserPostCommentDto>>
    {
        private readonly DataContext _dataContext;

        public GetUserPostCommentQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<UserPostCommentDto>> Handle(GetUserPostCommentQuery request, CancellationToken cancellationToken)
        {
            var comment = await _dataContext.UserPostComments.Include(x=> x.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);
            if(comment == null)
            {
                return Result<UserPostCommentDto>.Failure("There are no posts foun with given id");
            }
            return Result<UserPostCommentDto>.Success(new UserPostCommentDto
            {
                AppUserId = comment.AppUserId,
                Id = comment.Id,
                Text = comment.Text,
                UserPostId = comment.UserPostId,
                DisplayName = comment.AppUser.DisplayName,
                UserName = comment.AppUser.UserName,
            });
        }
    }
}
