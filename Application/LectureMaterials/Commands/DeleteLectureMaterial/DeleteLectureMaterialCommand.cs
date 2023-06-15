using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.LectureMaterials.Commands.DeleteLectureMaterial
{
    public class DeleteLectureMaterialCommand : IRequest<Result<Unit>>
    {
        public Guid LectureMaterialId { get; set; }
    }
    public class DeleteLectureMaterialCommandHandler : IRequestHandler<DeleteLectureMaterialCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IStorageService _storageService;

        public DeleteLectureMaterialCommandHandler(DataContext dataContext, IStorageService storageService)
        {
            _dataContext = dataContext;
            _storageService = storageService;
        }

        public async Task<Result<Unit>> Handle(DeleteLectureMaterialCommand request, CancellationToken cancellationToken)
        {
            var lectureMaterial = await _dataContext.LectureMaterials.FirstOrDefaultAsync(x => x.Id == request.LectureMaterialId);
            if (lectureMaterial == null)
            {
                return Result<Unit>.Failure("There are no lecture materials with given id");
            }

            var storageRes = await _storageService.DeleteFileAsync(lectureMaterial.FileName);

            if(storageRes == null || storageRes.StatusCode != 200)
            {
                return Result<Unit>.Failure("Something went wrong while deleting lecture material");
            }

            _dataContext.LectureMaterials.Remove(lectureMaterial);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Unit>.Failure("Failed to delete Lecture Material");
            }
            return Result<Unit>.Success(Unit.Value);


        }
    }
}
