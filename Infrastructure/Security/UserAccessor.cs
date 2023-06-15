using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _context;

        public UserAccessor(IHttpContextAccessor context)
        {
            _context = context;
        }

        public string GetUsername()
        {
            return _context.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
