using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Lecture
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public Guid CourseModuleId { get; set; }
        public CourseModule CourseModule { get; set; }
        public LectureMaterial LectureMaterial { get; set; }
    }
}
