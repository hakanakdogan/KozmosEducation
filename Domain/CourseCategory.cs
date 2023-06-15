using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CourseCategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Course> Courses { get; set; }
    }
}
