using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CourseAttendee
    {
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public bool IsCreator { get; set; }
    }
}
