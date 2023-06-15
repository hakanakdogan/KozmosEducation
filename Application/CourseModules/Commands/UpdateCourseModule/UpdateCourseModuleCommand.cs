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

namespace Application.CourseModules.Commands.UpdateCourseModule
{
    public class UpdateCourseModuleCommand : IRequest<Result<CourseModule>>
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Title { get; set; }
    }
    public class UpdateCourseModuleCommandHandler : IRequestHandler<UpdateCourseModuleCommand, Result<CourseModule>>
    {
        private readonly DataContext _dataContext;

        public UpdateCourseModuleCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<CourseModule>> Handle(UpdateCourseModuleCommand request, CancellationToken cancellationToken)
        {
            var courseModule = await _dataContext.CourseModules.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (courseModule == null) 
            {
                return Result<CourseModule>.Failure("There are no course module exist with given Id");
            }

            courseModule.Order = request.Order != default ? request.Order : courseModule.Order;

            courseModule.Title = request.Title != null ? request.Title : courseModule.Title;

            _dataContext.CourseModules.Update(courseModule);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<CourseModule>.Failure("Something went wrong while update");
            }

            return Result<CourseModule>.Success(courseModule);

        }
    }
}
