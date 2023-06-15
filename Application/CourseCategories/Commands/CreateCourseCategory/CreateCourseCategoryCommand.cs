using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Application.Interfaces;
using Application.Core;

namespace Application.CourseCategories.Commands.CreateCourseCategory
{
    public class CreateCourseCategoryCommand : IRequest<Result<CourseCategory>>
    {
        public string Name { get; set; }
    }
    public class CreateCourseCategoryCommandHandler : IRequestHandler<CreateCourseCategoryCommand, Result<CourseCategory>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateCourseCategoryCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<CourseCategory>> Handle(CreateCourseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new CourseCategory { Name = request.Name };
             _context.CourseCategories.Add(category);
            var res = await _context.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<CourseCategory>.Failure("Failed to create CourseCategory");
            }

            return Result<CourseCategory>.Success(category);

        }
    }
}
