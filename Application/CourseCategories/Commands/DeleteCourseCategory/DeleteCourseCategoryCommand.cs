using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseCategories.Commands.DeleteCourseCategory
{
    public class DeleteCourseCategoryCommand : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }
    public class DeleteCourseCategoryCommandHandler : IRequestHandler<DeleteCourseCategoryCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;

        public DeleteCourseCategoryCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Unit>> Handle(DeleteCourseCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _dataContext.CourseCategories.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (category == null)
            {
                return Result<Unit>.Failure("There are no records found with given id");
            }

             _dataContext.CourseCategories.Remove(category);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if(!res)
            {
                return Result<Unit>.Failure("Something went wrong");
            }
            return Result<Unit>.Success(Unit.Value);

        }
    }
}
