using Application.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IStorageService
    {
        Task<S3ResponseDto> UploadFileAsync(IFormFile file);
        Task<S3ResponseDto> DeleteFileAsync(string docName);
    }
}
