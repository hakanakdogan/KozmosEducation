using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Course
    {
        public Guid Id { get; set; }
        public string CourseName { get; set; }
        public string CourseDescription { get; set; }
        public string Thumbnail { get; set; }
        public Guid? CourseCategoryId { get; set; }
        public string? MetamaskId { get; set; }
        public float Price { get; set; }
        public CourseCategory? CourseCategory { get; set; }
        public List<CourseAttendee> Attendees { get; set; } = new List<CourseAttendee>();
        public List<CourseModule> CourseModules { get; set; }
        public List<UserPost> UserPosts { get; set; }
    }
}
