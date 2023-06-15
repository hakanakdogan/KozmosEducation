using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core 
{ // Bu sınıf application katmanında mediatr dönüş tipleri için kullanılacaktır.
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T> { Value = value, IsSuccess = true };
        public static Result<T> Failure(string errorMessage) => new Result<T> { IsSuccess = false, Error = errorMessage };
    }
}
