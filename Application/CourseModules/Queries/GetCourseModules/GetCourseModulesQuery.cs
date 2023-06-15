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

namespace Application.CourseModules.Queries.GetCourseModules
{
    public class GetCourseModulesQuery : IRequest<Result<List<CourseModule>>>
    {
        public Guid CourseId { get; set; }
    }
    public class GetCourseModulesQueryHandler : IRequestHandler<GetCourseModulesQuery, Result<List<CourseModule>>>
    {
        private readonly DataContext _dataContext;

        public GetCourseModulesQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<CourseModule>>> Handle(GetCourseModulesQuery request, CancellationToken cancellationToken)
        {
            var courseModules = await _dataContext.CourseModules.Include(u => u.Lectures).Where(x => x.CourseId == request.CourseId).OrderBy(x => x.Order).ToListAsync(cancellationToken);
            return  Result<List<CourseModule>>.Success(courseModules);
        }
    }
}
