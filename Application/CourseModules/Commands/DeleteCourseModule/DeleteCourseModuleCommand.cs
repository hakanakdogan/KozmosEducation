using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseModules.Commands.DeleteCourseModule
{
    public class DeleteCourseModuleCommand : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }
    public class DeleteCourseModuleCommandHandler : IRequestHandler<DeleteCourseModuleCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;

        public DeleteCourseModuleCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Unit>> Handle(DeleteCourseModuleCommand request, CancellationToken cancellationToken)
        {
            var courseModule = await _dataContext.CourseModules.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (courseModule == null)
            {
                return Result<Unit>.Failure("There are no course module with given Id");
            }
            _dataContext.CourseModules.Remove(courseModule);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<Unit>.Failure("Something went wrong while delete");
            }
            return Result<Unit>.Success(Unit.Value);

        }
    }
}
