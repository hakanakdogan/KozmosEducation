using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseModules.Commands.CreateCourseModule
{
    public class CreateCourseModuleCommand : IRequest<Result<CourseModule>>
    {
        public int Order { get; set; }
        public string Title { get; set; }
        public Guid CourseId { get; set; }
    }
    public class CreateCourseModuleCommandHandler : IRequestHandler<CreateCourseModuleCommand, Result<CourseModule>>
    {
        private readonly DataContext _dataContext;

        public CreateCourseModuleCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<CourseModule>> Handle(CreateCourseModuleCommand request, CancellationToken cancellationToken)
        {
            var courseModule = new CourseModule
            {
                Title = request.Title,
                CourseId = request.CourseId,
                Order = request.Order
            };

            _dataContext.CourseModules.Add(courseModule);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<CourseModule>.Failure("Failed to create course module");
            }
            return Result<CourseModule>.Success(courseModule);
        }
    }
}
