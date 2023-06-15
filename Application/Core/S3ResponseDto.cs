using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class S3ResponseDto
    {
        public int StatusCode { get; set; }
        public string FileType { get; set; }
        public string Url { get; set; }
        public string DocName { get; set; }
        public string Message { get; set; }
    }
}
