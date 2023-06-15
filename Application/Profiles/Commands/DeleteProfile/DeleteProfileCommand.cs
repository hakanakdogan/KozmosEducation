using Application.Core;
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

namespace Application.Profiles.Commands.DeleteProfile
{
    public class DeleteProfileCommand : IRequest<Result<Unit>>
    {
        public Guid UserProfileId { get; set; }
    }

    public class DeleteProfileCommandHandler : IRequestHandler<DeleteProfileCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public DeleteProfileCommandHandler(DataContext dataContext, UserManager<AppUser> userManager, IHttpContextAccessor contextAccessor)
        {
            _dataContext = dataContext;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }

        public async Task<Result<Unit>> Handle(DeleteProfileCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                return Result<Unit>.Failure("Something went wrong");
            }
            var profile = _dataContext.UserProfiles.FirstOrDefault(x => x.Id == request.UserProfileId && x.AppUserId == user.Id);
            if (profile == null)
            {
                return Result<Unit>.Failure("There are no profiles with given Id or you dont have permission");
            }
            _dataContext.UserProfiles.Remove(profile);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<Unit>.Failure("Something went wrong while updating profile");
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
