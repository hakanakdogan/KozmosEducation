using Application.Courses.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseCategories.Dtos
{
    public class CourseCategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<CourseDto> Courses { get; set; }
    }
}
