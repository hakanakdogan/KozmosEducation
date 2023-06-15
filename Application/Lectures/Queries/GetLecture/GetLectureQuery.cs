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

namespace Application.Lectures.Queries.GetLecture
{
    public class GetLectureQuery : IRequest<Result<Lecture>>
    {
        public Guid Id { get; set; }
    }
    public class GetLEctureQueryHandler : IRequestHandler<GetLectureQuery, Result<Lecture>>
    {
        private readonly DataContext _dataContext;

        public GetLEctureQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Lecture>> Handle(GetLectureQuery request, CancellationToken cancellationToken)
        {
            var lecture = await _dataContext.Lectures.Include(x => x.LectureMaterial).FirstOrDefaultAsync(x => x.Id == request.Id);
            if (lecture == null)
            {
                return Result<Lecture>.Failure("There are no lectures with given Id");
            }
            return Result<Lecture>.Success(lecture);
        }
    }
}
