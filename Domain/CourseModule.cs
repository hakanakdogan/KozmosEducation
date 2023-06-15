using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CourseModule
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Title { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public List<Lecture> Lectures { get; set; }
    }
}
