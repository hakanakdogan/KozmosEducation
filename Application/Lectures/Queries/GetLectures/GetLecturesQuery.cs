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

namespace Application.Lectures.Queries.GetLectures
{
    public class GetLecturesQuery : IRequest<Result<List<Lecture>>>
    {
        public Guid ModuleId { get; set; }
    }
    public class GetLecturesQueryHandler : IRequestHandler<GetLecturesQuery, Result<List<Lecture>>>
    {
        private readonly DataContext _dataContext;

        public GetLecturesQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<List<Lecture>>> Handle(GetLecturesQuery request, CancellationToken cancellationToken)
        {
            var lectures = await  _dataContext.Lectures.Include(x => x.LectureMaterial).Where(x => x.CourseModuleId == request.ModuleId).OrderBy(x => x.Order).ToListAsync();
            if (lectures == null)
            {
                return Result<List<Lecture>>.Failure("There are no lectures with give Id");
            }
            return Result<List<Lecture>>.Success(lectures);

        }
    }
}
