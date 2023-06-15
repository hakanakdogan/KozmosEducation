using API.Constants;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly DataContext _dataContext;

        public RoleController(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, DataContext dataContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dataContext = dataContext;
        }

        [HttpPost("upsertRole")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<RoleDto>> UpsertRole(UpsertRoleDto dto)
        {
            var isUpdate = dto.Id != null;
            var role = isUpdate ? await _roleManager.FindByIdAsync(dto.Id) : new AppRole { Name = dto.Name, CreatedOn = DateTime.UtcNow };
            var res = isUpdate ? await _roleManager.UpdateAsync(role) : await _roleManager.CreateAsync(role);


            if (res.Succeeded)
            {
                return new RoleDto
                {
                    Id = role.Id,
                    Name = role.Name,
                    CreatedOn = role.CreatedOn
                };
            }
            return BadRequest("Something went wrong");
        }


        [HttpGet("getRoles")]
        public async Task<ActionResult<List<string>>> GetUserRoles()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (user == null) return Unauthorized();

            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles == null || userRoles.Count < 1) return BadRequest("There are no roles found");
            return Ok(userRoles);


        }
        


    }
}
