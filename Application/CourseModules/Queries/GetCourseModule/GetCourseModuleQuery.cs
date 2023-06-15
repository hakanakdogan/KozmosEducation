using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseModules.Queries.GetCourseModule
{
    public class GetCourseModuleQuery : IRequest<Result<CourseModule>>
    {
        public Guid Id { get; set; }
    }
    public class GetCourseModuleQueryHandler : IRequestHandler<GetCourseModuleQuery, Result<CourseModule>>
    {
        private readonly DataContext _dataContext;

        public GetCourseModuleQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<CourseModule>> Handle(GetCourseModuleQuery request, CancellationToken cancellationToken)
        {
            var courseModule = await _dataContext.CourseModules.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (courseModule == null)
            {
                return Result<CourseModule>.Failure("There are no course module with given Id");
            }
            return Result<CourseModule>.Success(courseModule);
        }
    }
}
