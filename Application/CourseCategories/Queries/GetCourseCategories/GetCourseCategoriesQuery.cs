using Application.Core;
using Application.CourseCategories.Dtos;
using Application.Courses.Dtos;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseCategories.Queries.GetCourseCategories
{
    public class GetCourseCategoriesQuery : IRequest<Result<List<CourseCategoryDto>>>
    {
    }
    public class GetCourseCategoriesQueryHandler : IRequestHandler<GetCourseCategoriesQuery, Result<List<CourseCategoryDto>>>
    {
        private readonly DataContext _dataContext;

        public GetCourseCategoriesQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<CourseCategoryDto>>> Handle(GetCourseCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _dataContext.CourseCategories.Include(x => x.Courses).ThenInclude(x => x.Attendees).Select(y => new CourseCategoryDto
            {
                Id = y.Id,
                Name = y.Name,
                Courses = y.Courses.Select(z => new CourseDto
                {
                   CourseId = z.Id.ToString(),
                   CourseDescription = z.CourseDescription,
                   CourseCategory = z.CourseCategory.Name,
                   CourseName = z.CourseName,
                   Thumbnail = z.Thumbnail,
                   MetamaskId = z.MetamaskId,
                   Price = z.Price,
                    Attendees = z.Attendees.Select(x => new AttendeeDto
                    {
                        Id = x.AppUserId,
                        DisplayName = x.AppUser.DisplayName,
                        IsCreator = x.IsCreator,
                        UserName = x.AppUser.UserName
                    }).ToList()

                }).ToList()
            }).ToListAsync();

            return Result<List<CourseCategoryDto>>.Success(categories);
        }
    }
}
