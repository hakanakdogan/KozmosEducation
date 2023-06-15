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

namespace Application.Lectures.Commands.DeleteLecture
{
    public class DeleteLectureCommand : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }
    public class DeleteLectureComamandHandler : IRequestHandler<DeleteLectureCommand, Result<Unit>>
    {
        private readonly DataContext _dataContext;

        public DeleteLectureComamandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Result<Unit>> Handle(DeleteLectureCommand request, CancellationToken cancellationToken)
        {
            var lecture = await _dataContext.Lectures.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (lecture == null) 
            {
                return Result<Unit>.Failure("There are no lectures with given Id");
            }

            _dataContext.Lectures.Remove(lecture);
            var res = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            if (!res)
            {
                return Result<Unit>.Failure("Something went wrong while deleting lecture");
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
