using Application.CourseModules.Dtos;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Courses.Dtos
{
    public class CourseDto
    {
        public string CourseId { get; set; }
        public string? CourseName { get; set; }
        public string CourseCategory { get; set; }
        public string CourseDescription { get; set; }
        public string Thumbnail { get; set; }
        public string? MetamaskId { get; set; }
        public float Price { get; set; }
        public List<AttendeeDto>? Attendees { get; set; }
        public List<CourseModuleDto>? CourseModules { get; set; }
    }
}
