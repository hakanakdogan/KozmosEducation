using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseCategories.Commands.UpdateCourseCategory
{
    public class UpdateCourseCategoryCommand : IRequest<Result<CourseCategory>>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
    public class UpdateCourseCategoryCommandHandler : IRequestHandler<UpdateCourseCategoryCommand, Result<CourseCategory>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public UpdateCourseCategoryCommandHandler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<CourseCategory>> Handle(UpdateCourseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.CourseCategories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if(category == null)
            {
                return  Result<CourseCategory>.Failure("There is no category with given Id");
            }
            category.Name
                = request.Name;
            _context.CourseCategories.Update(category);
            var res = await _context.SaveChangesAsync(cancellationToken) > 0;

            if(!res)
            {
                return Result<CourseCategory>.Failure("Something went wrong while update");
            }

            return Result<CourseCategory>.Success(category);
        }
    }
}
