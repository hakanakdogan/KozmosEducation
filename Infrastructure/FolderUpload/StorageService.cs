using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.FolderUpload
{
    public class StorageService : IStorageService
    {
        private readonly IConfiguration _configuration;

        public StorageService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<S3ResponseDto> UploadFileAsync(IFormFile file)
        {
            var creds = new BasicAWSCredentials(_configuration["AWS:AccessKey"], _configuration["AWS:SecretKey"]);
            var config = new AmazonS3Config()
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUWest1
            };

            await using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileExt = Path.GetExtension(file.FileName);
            var docName = $"{Guid.NewGuid()}{fileExt}";

            var response = new S3ResponseDto();

            var isCorrectFormat = fileExt == ".jpg" || fileExt == ".jpeg" || fileExt == ".mp4" ? true : false;
                 
            if(!isCorrectFormat)
            {
                response.StatusCode = 400;
                response.Message = $"Acceptable file extension formats are : '.jpg', '.jpeg', '.mp4' but yours was : {fileExt}";
                return response;
            }

            try
            {
                var uploadRequest = new TransferUtilityUploadRequest()
                {
                    InputStream = memoryStream,
                    Key = docName,
                    BucketName = _configuration["AWS:BucketName"],
                    CannedACL = S3CannedACL.PublicRead
                };

                using var client = new AmazonS3Client(creds, config);

                var transferUtility = new TransferUtility(client);

                await transferUtility.UploadAsync(uploadRequest);


                response.StatusCode = 200;
                response.FileType = fileExt.Substring(1);
                response.DocName = docName;
                response.Url = $"https://kozmosedu-bucket.s3.eu-west-1.amazonaws.com/{docName}";
                response.Message = $"{docName} has been uploaded successfully"; 
            }

            catch (AmazonS3Exception s3Ex)
            {
                response.StatusCode = (int)s3Ex.StatusCode;
                response.Message = s3Ex.Message;

            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;
        }


        public async Task<S3ResponseDto> DeleteFileAsync(string docName)
        {
            var creds = new BasicAWSCredentials(_configuration["AWS:AccessKey"], _configuration["AWS:SecretKey"]);
            var config = new AmazonS3Config()
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUWest1
            };
            var response = new S3ResponseDto();

            try
            {
                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = _configuration["AWS:BucketName"],
                    Key = docName
                };

                using var client = new AmazonS3Client(creds, config);

                await client.DeleteObjectAsync(deleteRequest);
                response.StatusCode = 200;
                response.Message = $"{docName} has been deleted successfully";

            }
            catch (AmazonS3Exception s3Ex)
            {
                response.StatusCode = (int)s3Ex.StatusCode;
                response.Message = s3Ex.Message;

            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = ex.Message;
            }

            return response;


        }


    }
}
