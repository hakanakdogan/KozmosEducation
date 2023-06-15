using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Commands.RemoveThumbnail
{
    public class RemoveThumbnailCommand : IRequest<Result<Unit>>
    {
        public Guid CourseId { get; set; }
    }
    public class RemoveThumbnailCommandHandler : IRequestHandler<RemoveThumbnailCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IStorageService _storageService;
        private readonly IUserAccessor _userAccessor;

        public RemoveThumbnailCommandHandler(DataContext dataContext, IStorageService storageService, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _storageService = storageService;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(RemoveThumbnailCommand request, CancellationToken cancellationToken)
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

            var docName = course.Thumbnail.Substring(course.Thumbnail.LastIndexOf("/") + 1);

            var storageRes = await _storageService.DeleteFileAsync(docName);
            
            if (storageRes == null || storageRes.StatusCode != 200)
            {
                return Result<Unit>.Failure($"Error while deleting file: {storageRes.Message}");
            }

            course.Thumbnail = null;

            _dataContext.Courses.Update(course);

            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            if (!res)
            {
                return Result<Unit>.Failure("Somenthing went wrong while deleting thumbnail");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
