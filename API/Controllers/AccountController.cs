using API.DTOs;
using API.Services;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly TokenService _tokenService;
        private readonly IStorageService _storageService;

        public AccountController(DataContext dataContext, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, TokenService tokenService, IStorageService storageService)
        {
            _dataContext = dataContext;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _storageService = storageService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) {
                return BadRequest("Cannot find any user by given email.");
            }

            var res = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (res)
            {
                return await CreateUserDto(user);
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(_=> _.UserName == registerDto.Username))
            {
                return BadRequest("Username is already taken.");
            }
            if(await _userManager.Users.AnyAsync(_ => _.Email == registerDto.Email))
            {
                return BadRequest("Email is already taken");
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                DisplayName = registerDto.DisplayName,
                CreatedOn = DateTime.UtcNow,
                

            };

            var res = await _userManager.CreateAsync(user, registerDto.Password);

            if(res.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, registerDto.Role);
                return await CreateUserDto(user);
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpGet("getcurrentuser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return await CreateUserDto(user);
        }
        [Authorize]
        [HttpGet("getuserbyId/{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            var userRoles = await _userManager.GetRolesAsync(user);
            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                CreatedOn = user.CreatedOn,
                Username = user.UserName

            };

            if (userRoles != null && userRoles.Count >= 1)
            {
                userDto.Role = userRoles;
            }

            return userDto;
        }

        [HttpPost("uploadFile")]
        public async Task<IActionResult> UpladFile(IFormFile file)
        {
            var result = await _storageService.UploadFileAsync(file);
            return Ok(result);
        }

        [HttpDelete("{docname}")]
        public async Task<IActionResult> DeleteFile(string docname)
        {
            var result = await _storageService.DeleteFileAsync(docname);
            return Ok(result);
        }

        private async Task<UserDto> CreateUserDto(AppUser user)
        {

            var token = await _tokenService.CreateToken(user);
            var userRoles = await _userManager.GetRolesAsync(user);


            var userDto = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = token,
                CreatedOn = user.CreatedOn,
                Username = user.UserName
               
            };

            if (userRoles != null && userRoles.Count >= 1)
            {
                userDto.Role = userRoles;
            }

            return userDto;

        }
    }
}
