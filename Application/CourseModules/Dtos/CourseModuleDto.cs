using Application.Lectures.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CourseModules.Dtos
{
    public class CourseModuleDto
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Title { get; set; }
        public List<LectureDto> Lectures { get; set; }
    }
}
