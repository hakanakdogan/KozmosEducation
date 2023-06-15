using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.LectureMaterial;

namespace Application.LectureMaterials.Commands.CreateLectureMaterial
{
    public class CreateLectureMaterialCommand : IRequest<Result<LectureMaterial>>
    {
        public IFormFile File { get; set; }
        public Guid LectureId { get; set; }
    }
    public class CreateLectureMaterialCommandHandler : IRequestHandler<CreateLectureMaterialCommand, Result<LectureMaterial>>
    {
        private readonly DataContext _context;
        private readonly IStorageService _storageService;

        public CreateLectureMaterialCommandHandler(DataContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<Result<LectureMaterial>> Handle(CreateLectureMaterialCommand request, CancellationToken cancellationToken)
        {
            var storageRes = await _storageService.UploadFileAsync(request.File);
            if (storageRes == null || storageRes.StatusCode != 200)
            {
                return Result<LectureMaterial>.Failure($"Error while uploading file: {storageRes.Message}");
            }
            var lectureMaterial = new LectureMaterial
            {
                LectureId = request.LectureId,
                Url = storageRes.Url,
                FileName = storageRes.DocName
                
            };

            _context.LectureMaterials.Add(lectureMaterial);
            var res = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<LectureMaterial>.Failure("Failed to create Lecture Material");
            }
            return Result<LectureMaterial>.Success(lectureMaterial);
        }
    }
}
