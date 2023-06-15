namespace API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public IList<string> Role { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
