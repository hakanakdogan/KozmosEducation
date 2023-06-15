using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Lectures.Dtos
{
    public class LectureDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
        public LectureMaterial LectureMaterial { get; set; }
    }
}
