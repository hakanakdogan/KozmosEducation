using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseAttendee> CourseAttendees { get; set; }
        public DbSet<CourseModule> CourseModules { get; set; }
        public DbSet<Lecture> Lectures { get; set; }
        public DbSet<LectureMaterial> LectureMaterials { get; set; }
        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<UserPost> UserPosts { get; set; }
        public DbSet<UserPostReaction> UserPostReactions { get; set; }
        public DbSet<UserPostComment> UserPostComments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<CourseAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.CourseId }));

            builder.Entity<CourseAttendee>()
                .HasOne(x => x.Course)
                .WithMany(s => s.Attendees)
                .HasForeignKey(aa => aa.CourseId);

            builder.Entity<CourseAttendee>()
                .HasOne(x => x.AppUser)
                .WithMany(s => s.Courses)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<Course>()
                .HasMany(x => x.CourseModules)
                .WithOne(x => x.Course);
                

            builder.Entity<CourseModule>()
                .HasMany(x => x.Lectures)
                .WithOne(x => x.CourseModule);

            builder.Entity<CourseCategory>()
                .HasMany(x => x.Courses)
                .WithOne(x => x.CourseCategory)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<AppUser>()
                .HasMany(x => x.UserPosts)
                .WithOne(x => x.AppUser)
                .HasForeignKey(x => x.AppUserId);

            builder.Entity<AppUser>()
                .HasMany(x => x.UserPostReactions)
                .WithOne(x => x.AppUser)
                .HasForeignKey(x => x.AppUserId);

            builder.Entity<AppUser>()
                .HasMany(x => x.UserPostComments)
                .WithOne(x => x.AppUser)
                .HasForeignKey(x => x.AppUserId);

            builder.Entity<UserPost>()
                .HasMany(x => x.UserPostReactions)
                .WithOne(x => x.UserPost)
                .HasForeignKey(x => x.UserPostId);

            builder.Entity<UserPost>()
                .HasMany(x => x.UserPostComments)
                .WithOne(x => x.UserPost)
                .HasForeignKey(x => x.UserPostId);

            builder.Entity<Course>()
                .HasMany(x => x.UserPosts)
                .WithOne(x => x.Course);






        }
    }
}
