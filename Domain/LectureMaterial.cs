using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class LectureMaterial
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string FileName { get; set; }
        public Guid LectureId { get; set; }
        public Lecture Lecture { get; set; }

    }
}
