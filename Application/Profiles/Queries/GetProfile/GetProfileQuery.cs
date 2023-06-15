using Application.Core;
using Application.Profiles.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Queries.GetProfile
{
    public class GetProfileQuery : IRequest<Result<UserProfileDto>>
    {
        public Guid UserId { get; set; }
    }
    public class GetProfileQueryHandler : IRequestHandler<GetProfileQuery, Result<UserProfileDto>>
    {
        private readonly DataContext _context;

        public GetProfileQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<UserProfileDto>> Handle(GetProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(x => x.UserProfile).FirstOrDefaultAsync(x => x.Id == request.UserId.ToString());
            if (user == null)
            {
                return Result<UserProfileDto>.Failure("There are no users with given Id");
            }

            if (user.UserProfile == null)
            {
                return Result<UserProfileDto>.Failure("There are no profiles with given user");
            }


            var returnDto = new UserProfileDto
            {
                AppUserId = user.Id,
                Id = user.UserProfile.Id,
                Education = user.UserProfile.Education,
                NameSurname = user.UserProfile.NameSurname,
                Interests = user.UserProfile.Interests,
                Posts = user.UserProfile.Posts

            };

            return Result<UserProfileDto>.Success(returnDto);   
        }
    }
}
