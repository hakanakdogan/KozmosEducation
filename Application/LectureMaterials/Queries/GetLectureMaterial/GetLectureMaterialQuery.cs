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

namespace Application.LectureMaterials.Queries.GetLectureMaterial
{
    public class GetLectureMaterialQuery : IRequest<Result<LectureMaterial>>
    {
        public Guid Id { get; set; }
    }
    public class GetLectureMaterialQueryHandler : IRequestHandler<GetLectureMaterialQuery, Result<LectureMaterial>>
    {
        private readonly DataContext _dataContext;

        public GetLectureMaterialQueryHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<LectureMaterial>> Handle(GetLectureMaterialQuery request, CancellationToken cancellationToken)
        {
            var lectureMaterial = await _dataContext.LectureMaterials.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (lectureMaterial == null)
            {
                return Result<LectureMaterial>.Failure("There are no lecture material with given lecture id");
            }
            return Result<LectureMaterial>.Success(lectureMaterial);
        }
    }
}
