using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService
    {   
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public TokenService(IConfiguration configuration, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };
            

            var roles = await _userManager.GetRolesAsync(user);
            AddRolesToClaims(claims, roles);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Secrets:JwtSecret"]));//user secret ya da appsettings kullanılacak karar ver.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var descriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = creds,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(descriptor);
            return tokenHandler.WriteToken(token);
            
        }

        private void AddRolesToClaims(List<Claim> claims, IList<string> roles)
        {
            foreach (var role in roles)
            {
                var roleClaim = new Claim(ClaimTypes.Role, role);
                claims.Add(roleClaim);
            }

        }
    }
}
