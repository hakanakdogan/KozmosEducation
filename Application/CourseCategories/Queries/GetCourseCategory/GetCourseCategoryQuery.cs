using Application.Core;
using Application.CourseCategories.Dtos;
using Application.Courses.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseCategories.Queries.GetCourseCategory
{
    public class GetCourseCategoryQuery : IRequest<Result<CourseCategoryDto>>
    {
        public Guid Id { get; set; }
    }
    public class GetCourseCategoryQueryHandler : IRequestHandler<GetCourseCategoryQuery, Result<CourseCategoryDto>>
    {
        private readonly DataContext _dataContext;

        public GetCourseCategoryQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<CourseCategoryDto>> Handle(GetCourseCategoryQuery request, CancellationToken cancellationToken)
        {
            var category = await _dataContext.CourseCategories.Include(x => x.Courses).ThenInclude(x => x.Attendees)
                .Where(a => a.Id == request.Id).Select(u => new CourseCategoryDto
                {
                    Id = request.Id,
                    Name = u.Name,
                    Courses = u.Courses.Select(z => new CourseDto
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

                }).FirstOrDefaultAsync(cancellationToken);

            return Result<CourseCategoryDto>.Success(category);
        }
    }
}
