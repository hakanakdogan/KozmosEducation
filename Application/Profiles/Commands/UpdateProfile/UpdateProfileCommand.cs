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

namespace Application.Profiles.Commands.UpdateProfile
{
    public class UpdateProfileCommand : IRequest<Result<UserProfileDto>>
    {
        public Guid ProfileId { get; set; }
        public string NameSurname { get; set; }
        public string Interests { get; set; }
        public string Posts { get; set; }
        public string Education { get; set; }
    }
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result<UserProfileDto>>
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UpdateProfileCommandHandler(DataContext context, UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Result<UserProfileDto>> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                return Result<UserProfileDto>.Failure("Something went wrong");
            }
            var profile = _context.UserProfiles.FirstOrDefault(x => x.Id == request.ProfileId && x.AppUserId == user.Id);
            if (profile == null)
            {
                return Result<UserProfileDto>.Failure("There are no profiles with given Id or you dont have permission");
            }
            profile.NameSurname = request.NameSurname != null ? request.NameSurname : profile.NameSurname;
            profile.Interests = request.Interests != null ? request.Interests : profile.Interests;
            profile.Posts = request.Posts != null ? request.Posts : profile.Posts;
            profile.Education = request.Education != null ? request.Education : profile.Education;

            _context.UserProfiles.Update(profile);

            var res = await _context.SaveChangesAsync(cancellationToken) > 0;

            if(!res)
            {
                return Result<UserProfileDto>.Failure("Something went wrong while updating profile");
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
