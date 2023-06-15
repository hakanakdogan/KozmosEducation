using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if(!userManager.Users.Any() && !roleManager.Roles.Any())
            {
                var roles = new List<AppRole>
                {
                    new AppRole
                    {
                        Name = "Admin"
                    },
                    new AppRole
                    {
                        Name = "Eğitmen"
                    },
                    new AppRole
                    {
                        Name  = "Öğrenci"
                    }
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }


                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Email = "egitmen@example.com",
                        UserName = "Egitmen",
                        DisplayName = "Eğitmen",
                        CreatedOn = DateTime.UtcNow,

                    },
                    new AppUser
                    {
                        Email = "ogrenci@example.com",
                        UserName = "Ogrenci",
                        DisplayName = "Öğrenci",
                        CreatedOn = DateTime.UtcNow,

                    },
                    new AppUser
                    {
                        Email = "admin@example.com",
                        UserName = "Admin",
                        DisplayName = "Admin",
                        CreatedOn = DateTime.UtcNow,

                    }
                };

                foreach (var user in users)
                {
                   var res =  await userManager.CreateAsync(user, "Pa$$w0rd");
                    if (!res.Succeeded)
                    {
                        return;
                    }
                    switch (user.UserName)
                    {
                        case "Egitmen":
                            await userManager.AddToRoleAsync(user, "Eğitmen");
                            break;
                        case "Ogrenci":
                            await userManager.AddToRoleAsync(user, "Öğrenci");
                            break;
                        case "Admin":
                            await userManager.AddToRoleAsync(user, "Admin");
                            break;
                        default:
                            break;
                    }


                }
            }
        }
    }
}
