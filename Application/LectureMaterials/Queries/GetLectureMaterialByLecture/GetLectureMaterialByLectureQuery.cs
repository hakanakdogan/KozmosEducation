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

namespace Application.LectureMaterials.Queries.GetLectureMaterialByLecture
{
    public class GetLectureMaterialByLectureQuery : IRequest<Result<LectureMaterial>>
    {
        public Guid LectureId { get; set; }
    }
    public class GetLectureMaterialByLectureQueryHandler : IRequestHandler<GetLectureMaterialByLectureQuery, Result<LectureMaterial>>
    {
        private readonly DataContext _dataContext;

        public GetLectureMaterialByLectureQueryHandler(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<Result<LectureMaterial>> Handle(GetLectureMaterialByLectureQuery request, CancellationToken cancellationToken)
        {
            var lectureMaterial = await _dataContext.LectureMaterials.FirstOrDefaultAsync(x => x.LectureId == request.LectureId);
            if (lectureMaterial == null)
            {
                return Result<LectureMaterial>.Failure("There are no lecture material with given lecture id");
            }
            return Result<LectureMaterial>.Success(lectureMaterial);
        }
    }
}
