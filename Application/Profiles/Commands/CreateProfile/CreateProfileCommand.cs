using Application.Core;
using Application.Profiles.Dtos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands.CreateProfile
{
    public class CreateProfileCommand : IRequest<Result<UserProfileDto>>
    {
        public string NameSurname { get; set; }
        public string Interests { get; set; }
        public string Posts { get; set; }
        public string Education { get; set; }
    }
    public class CreateProfileCommandHandler : IRequestHandler<CreateProfileCommand, Result<UserProfileDto>>
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateProfileCommandHandler(DataContext dataContext, UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _dataContext = dataContext;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<UserProfileDto>> Handle(CreateProfileCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                return Result<UserProfileDto>.Failure("Something went wrong");
            }
            var profile = new UserProfile
            {
                AppUserId = user.Id,
                Education = request.Education,
                Interests = request.Interests,
                Posts = request.Posts,
                NameSurname = request.NameSurname
            };

           

            _dataContext.UserProfiles.Add(profile);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<UserProfileDto>.Failure("Failed to create profile");
            }
            var returnDto = new UserProfileDto
            {
                AppUserId = user.Id,
                Education = profile.Education,
                Interests = profile.Interests,
                NameSurname = profile.NameSurname,
                Id = profile.Id,
                Posts = profile.Posts
            };

            return Result<UserProfileDto>.Success(returnDto);
        }
    }
}
