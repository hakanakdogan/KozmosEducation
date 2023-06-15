using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Commands.CreateThumbnail
{
    public class CreateThumbnailCommand : IRequest<Result<Unit>>
    {
        public Guid CourseId { get; set; }
        public IFormFile File { get; set; }
    }
    public class CreateThumbnailCommandHandler : IRequestHandler<CreateThumbnailCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IStorageService _storageService;
        private readonly IUserAccessor _userAccessor;

        public CreateThumbnailCommandHandler(DataContext dataContext, IStorageService storageService, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _storageService = storageService;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(CreateThumbnailCommand request, CancellationToken cancellationToken)
        {
            var course = await _dataContext.Courses.FirstOrDefaultAsync(x => x.Id == request.CourseId);
            if (course == null)
            {
                return Result<Unit>.Failure("There are no courses found with given id");
            }

            var user = await _dataContext.Users.Include(x => x.Courses).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var isCreator = user.Courses.Any(x => x.CourseId == request.CourseId && x.IsCreator == true);

            if (!isCreator)
            {
                return Result<Unit>.Failure("You are not the owner of the course");
            }

            var storageRes = await _storageService.UploadFileAsync(request.File);

            if (storageRes == null || storageRes.StatusCode != 200)
            {
                return Result<Unit>.Failure($"Error while uploading file: {storageRes.Message}");
            }

            course.Thumbnail = storageRes.Url;

            _dataContext.Courses.Update(course);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Unit>.Failure("Somenthing went wrong while creating thumbnail");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
